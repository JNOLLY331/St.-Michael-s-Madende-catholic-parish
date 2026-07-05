import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/* ─── Pure CountUp Hook ─── */
function useCountUp(target, duration = 2500, startCounting = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!startCounting) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Easing: easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [target, duration, startCounting]);
  return count;
}

/* ─── Stat Counter Card ─── */
function StatCard({ value, label, suffix = '', icon, delay = 0 }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  const count = useCountUp(value, 2200, visible);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="group flex flex-col items-center text-center p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#ffe088]/10"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="w-16 h-16 rounded-full bg-[#ffe088]/10 border border-[#ffe088]/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
        <span className="material-symbols-outlined text-[#ffe088] text-3xl">{icon}</span>
      </div>
      <div className="text-5xl font-oswald font-bold text-white mb-1 leading-none">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-[#ffe088]/80 font-oswald tracking-widest uppercase text-sm font-semibold mt-2">
        {label}
      </div>
    </div>
  );
}

/* ─── Saints Section ─── */

// 60+ curated saints covering the full liturgical year
// wikiSlug = exact Wikipedia page title for reliable image fetching
// fallbackImg = direct Wikimedia Commons URL guaranteed to load
const SAINTS_SEED = [
  { name: 'Saint Joseph', date: 'Mar 19', rank: 'Solemnity', colour: 'white', wikiSlug: 'Saint_Joseph', fallbackImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Joseph_and_Jesus.jpg/320px-Joseph_and_Jesus.jpg' },
  { name: 'Saint Patrick', date: 'Mar 17', rank: 'Optional', colour: 'white', wikiSlug: 'Saint_Patrick', fallbackImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Patrick_of_Ireland.jpg/320px-Patrick_of_Ireland.jpg' },
  { name: 'Saint Thomas Aquinas', date: 'Jan 28', rank: 'Memorial', colour: 'white', wikiSlug: 'Thomas_Aquinas', fallbackImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/St._Thomas_Aquinas.jpg/320px-St._Thomas_Aquinas.jpg' },
  { name: 'Saint Francis of Assisi', date: 'Oct 4', rank: 'Memorial', colour: 'white', wikiSlug: 'Francis_of_Assisi', fallbackImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Francesco_d%27Assisi_-_Cimabue.jpg/320px-Francesco_d%27Assisi_-_Cimabue.jpg' },
  { name: 'Saint Teresa of Ávila', date: 'Oct 15', rank: 'Memorial', colour: 'white', wikiSlug: 'Teresa_of_%C3%81vila', fallbackImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Santa_Teresa_de_Jes%C3%BAs_%28Ribera%29.jpg/320px-Santa_Teresa_de_Jes%C3%BAs_%28Ribera%29.jpg' },
  { name: 'Saint John Paul II', date: 'Oct 22', rank: 'Optional', colour: 'white', wikiSlug: 'Pope_John_Paul_II', fallbackImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/JohannesPaulus2_big.jpg/320px-JohannesPaulus2_big.jpg' },
  { name: 'Saint Michael the Archangel', date: 'Sep 29', rank: 'Feast', colour: 'white', wikiSlug: 'Michael_(archangel)', fallbackImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Guido_Reni_031.jpg/320px-Guido_Reni_031.jpg' },
  { name: 'Saint Mary Magdalene', date: 'Jul 22', rank: 'Feast', colour: 'white', wikiSlug: 'Mary_Magdalene', fallbackImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Georges_de_La_Tour_-_The_Penitent_Magdalene_-_WGA12340.jpg/320px-Georges_de_La_Tour_-_The_Penitent_Magdalene_-_WGA12340.jpg' },
  { name: 'Saint Peter', date: 'Jun 29', rank: 'Solemnity', colour: 'red', wikiSlug: 'Saint_Peter', fallbackImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Rubens_apostel_petrus_grt.jpg/320px-Rubens_apostel_petrus_grt.jpg' },
  { name: 'Saint Paul the Apostle', date: 'Jun 29', rank: 'Solemnity', colour: 'red', wikiSlug: 'Paul_the_Apostle', fallbackImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Bartolomeo_Montagna_-_Saint_Paul_-_WGA16271.jpg/320px-Bartolomeo_Montagna_-_Saint_Paul_-_WGA16271.jpg' },
  { name: 'Saint John the Baptist', date: 'Jun 24', rank: 'Solemnity', colour: 'white', wikiSlug: 'John_the_Baptist', fallbackImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Da_Vinci_John_the_Baptist.jpg/320px-Da_Vinci_John_the_Baptist.jpg' },
  { name: 'Saint Benedict', date: 'Jul 11', rank: 'Memorial', colour: 'white', wikiSlug: 'Benedict_of_Nursia', fallbackImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Hans_Holbein_the_Younger_-_Saint_Benedict.jpg/320px-Hans_Holbein_the_Younger_-_Saint_Benedict.jpg' },
  { name: 'Saint Thérèse of Lisieux', date: 'Oct 1', rank: 'Memorial', colour: 'white', wikiSlug: 'Th%C3%A9r%C3%A8se_of_Lisieux', fallbackImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Therese_de_Lisieux.jpg/320px-Therese_de_Lisieux.jpg' },
  { name: 'Saint John Vianney', date: 'Aug 4', rank: 'Memorial', colour: 'white', wikiSlug: 'John_Vianney', fallbackImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Jean-Marie-Vianney.jpg/320px-Jean-Marie-Vianney.jpg' },
  { name: 'Saint Dominic', date: 'Aug 8', rank: 'Memorial', colour: 'white', wikiSlug: 'Dominic_of_Osma', fallbackImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Claudio_Coello_Santo_Dom%C3%ADngo.jpg/320px-Claudio_Coello_Santo_Dom%C3%ADngo.jpg' },
  { name: 'Saint Ignatius of Loyola', date: 'Jul 31', rank: 'Memorial', colour: 'white', wikiSlug: 'Ignatius_of_Loyola', fallbackImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Ignatius_Loyola.jpg/320px-Ignatius_Loyola.jpg' },
  { name: 'Saint Francis Xavier', date: 'Dec 3', rank: 'Memorial', colour: 'white', wikiSlug: 'Francis_Xavier', fallbackImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Francis_Xavier.jpg/320px-Francis_Xavier.jpg' },
  { name: 'Saint Augustine', date: 'Aug 28', rank: 'Memorial', colour: 'white', wikiSlug: 'Augustine_of_Hippo', fallbackImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Sandro_Botticelli_-_St_Augustine.jpg/320px-Sandro_Botticelli_-_St_Augustine.jpg' },
  { name: 'Saint Ambrose', date: 'Dec 7', rank: 'Memorial', colour: 'white', wikiSlug: 'Ambrose', fallbackImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Ambrosius_van_Milaan.jpg/320px-Ambrosius_van_Milaan.jpg' },
  { name: 'Saint Jerome', date: 'Sep 30', rank: 'Memorial', colour: 'white', wikiSlug: 'Jerome', fallbackImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Caravaggio_-_Saint_Jerome_Writing.jpg/320px-Caravaggio_-_Saint_Jerome_Writing.jpg' },
  { name: 'Saint Gregory the Great', date: 'Sep 3', rank: 'Memorial', colour: 'white', wikiSlug: 'Pope_Gregory_I', fallbackImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Gregorythegreat.jpg/320px-Gregorythegreat.jpg' },
  { name: 'Saint Bonaventure', date: 'Jul 15', rank: 'Memorial', colour: 'white', wikiSlug: 'Bonaventure', fallbackImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Joos_van_Wassenhove_-_Saint_Bonaventure_-_WGA11943.jpg/320px-Joos_van_Wassenhove_-_Saint_Bonaventure_-_WGA11943.jpg' },
  { name: 'Saint Anthony of Padua', date: 'Jun 13', rank: 'Memorial', colour: 'white', wikiSlug: 'Anthony_of_Padua', fallbackImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Murillo_-_San_Antonio_de_Padua.jpg/320px-Murillo_-_San_Antonio_de_Padua.jpg' },
  { name: 'Saint Nicholas', date: 'Dec 6', rank: 'Optional', colour: 'white', wikiSlug: 'Nicholas_of_Myra', fallbackImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Icon_of_Nicholas_of_Myra.jpg/320px-Icon_of_Nicholas_of_Myra.jpg' },
  { name: 'Saint Stephen', date: 'Dec 26', rank: 'Feast', colour: 'red', wikiSlug: 'Saint_Stephen', fallbackImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Annibale_Carracci_%281560-1609%29_-_The_Stoning_of_St._Stephen.jpg/320px-Annibale_Carracci_%281560-1609%29_-_The_Stoning_of_St._Stephen.jpg' },
  { name: 'Saint Thomas the Apostle', date: 'Jul 3', rank: 'Feast', colour: 'red', wikiSlug: 'Thomas_the_Apostle', fallbackImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Caravaggio_-_The_Incredulity_of_Saint_Thomas.jpg/320px-Caravaggio_-_The_Incredulity_of_Saint_Thomas.jpg' },
  { name: 'Saint Luke the Evangelist', date: 'Oct 18', rank: 'Feast', colour: 'red', wikiSlug: 'Luke_the_Evangelist', fallbackImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Brussels-Sablon-Minia01.jpg/320px-Brussels-Sablon-Minia01.jpg' },
  { name: 'Saint Mark the Evangelist', date: 'Apr 25', rank: 'Feast', colour: 'red', wikiSlug: 'Mark_the_Evangelist', fallbackImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Jacopo_Tintoretto_-_The_Evangelists_Mark_and_Luke_-_WGA22724.jpg/320px-Jacopo_Tintoretto_-_The_Evangelists_Mark_and_Luke_-_WGA22724.jpg' },
  { name: 'Saint Maria Goretti', date: 'Jul 6', rank: 'Optional', colour: 'red', wikiSlug: 'Maria_Goretti', fallbackImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Maria_Goretti.jpg/320px-Maria_Goretti.jpg' },
  { name: 'Saint Joan of Arc', date: 'May 30', rank: 'Optional', colour: 'white', wikiSlug: 'Joan_of_Arc', fallbackImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Joan_of_arc_miniature_graded.jpg/320px-Joan_of_arc_miniature_graded.jpg' },
  { name: 'Saint Maximilian Kolbe', date: 'Aug 14', rank: 'Memorial', colour: 'red', wikiSlug: 'Maximilian_Kolbe', fallbackImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Maximilian_Kolbe.jpg/320px-Maximilian_Kolbe.jpg' },
  { name: 'Our Lady of Lourdes', date: 'Feb 11', rank: 'Optional', colour: 'white', wikiSlug: 'Our_Lady_of_Lourdes', fallbackImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Our_lady_of_lourdes.jpg/320px-Our_lady_of_lourdes.jpg' },
  { name: 'Our Lady of Guadalupe', date: 'Dec 12', rank: 'Feast', colour: 'white', wikiSlug: 'Our_Lady_of_Guadalupe', fallbackImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Virgen_de_guadalupe1.jpg/320px-Virgen_de_guadalupe1.jpg' },
  { name: 'Our Lady of Fatima', date: 'May 13', rank: 'Optional', colour: 'white', wikiSlug: 'Our_Lady_of_F%C3%A1tima', fallbackImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Our_Lady_of_F%C3%A1tima_%28tiled%29.jpg/320px-Our_Lady_of_F%C3%A1tima_%28tiled%29.jpg' },
  { name: 'Saint Catherine of Siena', date: 'Apr 29', rank: 'Memorial', colour: 'white', wikiSlug: 'Catherine_of_Siena', fallbackImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Caterina_da_Siena.jpg/320px-Caterina_da_Siena.jpg' },
  { name: 'Saint Monica', date: 'Aug 27', rank: 'Memorial', colour: 'white', wikiSlug: 'Monica_of_Hippo', fallbackImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Ary_Scheffer_-_Saint_Augustin_et_sainte_Monique_%28Louvre%2C_1846%29.jpg/320px-Ary_Scheffer_-_Saint_Augustin_et_sainte_Monique_%28Louvre%2C_1846%29.jpg' },
  { name: 'Saint Clare of Assisi', date: 'Aug 11', rank: 'Memorial', colour: 'white', wikiSlug: 'Clare_of_Assisi', fallbackImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Simone_Martini_-_St_Clare_-_c._1320.jpg/320px-Simone_Martini_-_St_Clare_-_c._1320.jpg' },
  { name: 'Saint Cecilia', date: 'Nov 22', rank: 'Memorial', colour: 'red', wikiSlug: 'Cecilia_(saint)', fallbackImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Carlo_Dolci_-_Saint_Cecilia.jpg/320px-Carlo_Dolci_-_Saint_Cecilia.jpg' },
  { name: 'Saint Lucy', date: 'Dec 13', rank: 'Memorial', colour: 'red', wikiSlug: 'Lucy_of_Syracuse', fallbackImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Francisco_de_Zurbar%C3%A1n_047.jpg/320px-Francisco_de_Zurbar%C3%A1n_047.jpg' },
  { name: 'Saint Agnes', date: 'Jan 21', rank: 'Memorial', colour: 'red', wikiSlug: 'Agnes_of_Rome', fallbackImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Zurbaran-St_Agnes.jpg/320px-Zurbaran-St_Agnes.jpg' },
  { name: 'Saint Philip Neri', date: 'May 26', rank: 'Memorial', colour: 'white', wikiSlug: 'Philip_Neri', fallbackImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Philip_Neri_by_Guido_Reni.jpg/320px-Philip_Neri_by_Guido_Reni.jpg' },
  { name: 'Saint Lawrence', date: 'Aug 10', rank: 'Feast', colour: 'red', wikiSlug: 'Lawrence_of_Rome', fallbackImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Lorenzo_Zaragoza_-_Saint_Lawrence_-_WGA14145.jpg/320px-Lorenzo_Zaragoza_-_Saint_Lawrence_-_WGA14145.jpg' },
  { name: 'Saint Bartholomew', date: 'Aug 24', rank: 'Feast', colour: 'red', wikiSlug: 'Bartholomew_the_Apostle', fallbackImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Bartolomew_apostle_-_Ribera.jpg/320px-Bartolomew_apostle_-_Ribera.jpg' },
  { name: 'Saint Matthew', date: 'Sep 21', rank: 'Feast', colour: 'red', wikiSlug: 'Matthew_the_Apostle', fallbackImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Caravaggio_-_The_Calling_of_Saint_Matthew.jpg/320px-Caravaggio_-_The_Calling_of_Saint_Matthew.jpg' },
  { name: 'Saint Andrew the Apostle', date: 'Nov 30', rank: 'Feast', colour: 'red', wikiSlug: 'Andrew_the_Apostle', fallbackImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Bartolome_Esteban_Perez_Murillo_-_Saint_Andrew_-_WGA16330.jpg/320px-Bartolome_Esteban_Perez_Murillo_-_Saint_Andrew_-_WGA16330.jpg' },
  { name: 'Saint James the Greater', date: 'Jul 25', rank: 'Feast', colour: 'red', wikiSlug: 'James_the_Greater', fallbackImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/James_the_greater.jpg/320px-James_the_greater.jpg' },
  { name: 'Saint John the Apostle', date: 'Dec 27', rank: 'Feast', colour: 'white', wikiSlug: 'John_the_Apostle', fallbackImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Domenichino_-_St_John_the_Evangelist.jpg/320px-Domenichino_-_St_John_the_Evangelist.jpg' },
  { name: 'All Saints', date: 'Nov 1', rank: 'Solemnity', colour: 'white', wikiSlug: "All_Saints'_Day", fallbackImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/All_Saints%27_Day_-Guido_da_Siena.jpg/320px-All_Saints%27_Day_-Guido_da_Siena.jpg' },
  { name: 'Saint Albert the Great', date: 'Nov 15', rank: 'Optional', colour: 'white', wikiSlug: 'Albertus_Magnus', fallbackImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Albertus_Magnus.jpg/320px-Albertus_Magnus.jpg' },
  { name: 'Saint Elizabeth of Hungary', date: 'Nov 17', rank: 'Memorial', colour: 'white', wikiSlug: 'Elizabeth_of_Hungary', fallbackImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Simone_Martini_-_St_Elizabeth_of_Hungary_-_WGA21433.jpg/320px-Simone_Martini_-_St_Elizabeth_of_Hungary_-_WGA21433.jpg' },
  { name: 'Saint Francis de Sales', date: 'Jan 24', rank: 'Memorial', colour: 'white', wikiSlug: 'Francis_de_Sales', fallbackImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Francisco_de_Sales_-_Francesco_Coghetti.jpg/320px-Francisco_de_Sales_-_Francesco_Coghetti.jpg' },
  { name: 'Saint John Bosco', date: 'Jan 31', rank: 'Memorial', colour: 'white', wikiSlug: 'John_Bosco', fallbackImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Don_Bosco.jpg/320px-Don_Bosco.jpg' },
  { name: 'Saint Perpetua and Felicity', date: 'Mar 7', rank: 'Memorial', colour: 'red', wikiSlug: 'Perpetua_and_Felicitas', fallbackImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Icon_of_Perpetua_and_Felicitas.jpg/320px-Icon_of_Perpetua_and_Felicitas.jpg' },
  { name: 'Saint Isidore of Seville', date: 'Apr 4', rank: 'Optional', colour: 'white', wikiSlug: 'Isidore_of_Seville', fallbackImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/El_obispo_Isidoro_de_Sevilla_%28s._XII%29.jpg/320px-El_obispo_Isidoro_de_Sevilla_%28s._XII%29.jpg' },
  { name: 'Saint George', date: 'Apr 23', rank: 'Optional', colour: 'red', wikiSlug: 'Saint_George', fallbackImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Paolo_Uccello_-_Saint_George_and_the_Dragon_-_National_Gallery.jpg/320px-Paolo_Uccello_-_Saint_George_and_the_Dragon_-_National_Gallery.jpg' },
  { name: 'Saint Bernard of Clairvaux', date: 'Aug 20', rank: 'Memorial', colour: 'white', wikiSlug: 'Bernard_of_Clairvaux', fallbackImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Bernard_of_clairvaux_-_Philippe_de_Champaigne.jpg/320px-Bernard_of_clairvaux_-_Philippe_de_Champaigne.jpg' },
  { name: 'Saint Pius X', date: 'Aug 21', rank: 'Memorial', colour: 'white', wikiSlug: 'Pope_Pius_X', fallbackImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Pius_X%2C_por_Gerome_Donn%C3%A9.jpg/320px-Pius_X%2C_por_Gerome_Donn%C3%A9.jpg' },
  { name: 'Saint Teresa of Calcutta', date: 'Sep 5', rank: 'Optional', colour: 'white', wikiSlug: 'Mother_Teresa', fallbackImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Mother_Teresa_1.jpg/320px-Mother_Teresa_1.jpg' },
  { name: 'Saint Faustina Kowalska', date: 'Oct 5', rank: 'Optional', colour: 'white', wikiSlug: 'Faustina_Kowalska', fallbackImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Faustyna.jpg/320px-Faustyna.jpg' },
  { name: 'Saint Leo the Great', date: 'Nov 10', rank: 'Memorial', colour: 'white', wikiSlug: 'Pope_Leo_I', fallbackImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Raphael_-_Leo_I_repulsing_Attila_%28detail%29.jpg/320px-Raphael_-_Leo_I_repulsing_Attila_%28detail%29.jpg' },
  { name: 'Saint Martin of Tours', date: 'Nov 11', rank: 'Memorial', colour: 'white', wikiSlug: 'Martin_of_Tours', fallbackImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/El_Greco_-_St._Martin_and_the_Beggar.jpg/320px-El_Greco_-_St._Martin_and_the_Beggar.jpg' },
  { name: 'Saint Kateri Tekakwitha', date: 'Jul 14', rank: 'Optional', colour: 'white', wikiSlug: 'Kateri_Tekakwitha', fallbackImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Kateri_Tekakwitha_1.jpg/320px-Kateri_Tekakwitha_1.jpg' },
  { name: 'Saint Maximilian the Martyr', date: 'Mar 12', rank: 'Optional', colour: 'red', wikiSlug: 'Maximilian_of_Tebessa', fallbackImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Christ_in_soldier%27s_dress%2C_1490.jpg/320px-Christ_in_soldier%27s_dress%2C_1490.jpg' },
  { name: 'Saint Justin Martyr', date: 'Jun 1', rank: 'Memorial', colour: 'red', wikiSlug: 'Justin_Martyr', fallbackImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Justin_de_Capadocia.jpg/320px-Justin_de_Capadocia.jpg' },
  { name: 'Saint Irenaeus', date: 'Jun 28', rank: 'Memorial', colour: 'red', wikiSlug: 'Irenaeus', fallbackImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Irenaeus.jpg/320px-Irenaeus.jpg' },
];

const RANK_COLOURS = {
  Solemnity: '#7b0018',
  Feast: '#9c3b00',
  Memorial: '#735c00',
  Optional: '#2b271e',
};

function SaintsMarquee() {
  const [saints, setSaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [isFilterMode, setIsFilterMode] = useState(false);

  useEffect(() => {
    const enrich = async () => {
      const enriched = await Promise.all(
        SAINTS_SEED.map(async (s) => {
          try {
            const wikiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(s.wikiSlug)}`;
            const res = await fetch(wikiUrl, { signal: AbortSignal.timeout(7000) });
            if (!res.ok) throw new Error('no wiki');
            const data = await res.json();
            // Use the Wikipedia-provided thumbnail without mutating it if possible, otherwise fallback
            const img = data.thumbnail?.source || s.fallbackImg;
            return { ...s, image: img, extract: data.extract };
          } catch {
            return { ...s, image: s.fallbackImg, extract: '' };
          }
        })
      );
      setSaints(enriched);
      setLoading(false);
    };
    enrich();
  }, []);

  const filtered = query.trim()
    ? saints.filter(s =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.date.toLowerCase().includes(query.toLowerCase()) ||
      s.rank.toLowerCase().includes(query.toLowerCase())
    )
    : saints;

  const handleSearch = (e) => {
    setQuery(e.target.value);
    setIsFilterMode(e.target.value.trim().length > 0);
  };

  return (
    <section className="saints-section" id="saints-of-the-month">
      <div className="saints-section__header">
        <div className="saints-section__header-inner">
          <p className="saints-section__eyebrow">Communion of Saints</p>
          <h2 className="saints-section__title">Saints of the Liturgical Year</h2>
          <p className="saints-section__subtitle">
            {saints.length > 0
              ? `${saints.length} saints from the Roman Catholic Calendar — photos from Wikipedia`
              : 'Loading saints from the Roman Catholic Liturgical Calendar…'}
          </p>
          <div className="saints-search-wrap">
            <span className="material-symbols-outlined saints-search-icon">search</span>
            <input
              id="saints-search"
              className="saints-search"
              type="text"
              placeholder="Filter by name, date, or rank…"
              value={query}
              onChange={handleSearch}
              aria-label="Search saints"
            />
            {query && (
              <button className="saints-search-clear" onClick={() => { setQuery(''); setIsFilterMode(false); }} aria-label="Clear search">
                <span className="material-symbols-outlined">close</span>
              </button>
            )}
          </div>
          {isFilterMode && (
            <p className="saints-filter-count">
              {filtered.length === 0 ? 'No saints match your search' : `${filtered.length} saint${filtered.length !== 1 ? 's' : ''} found`}
            </p>
          )}
        </div>
      </div>

      {loading && (
        <div className="saints-loading">
          <div className="saints-loader" />
          <span className="saints-loading-text">Loading Saints…</span>
        </div>
      )}

      {!loading && !isFilterMode && filtered.length > 0 && (
        <div className="saints-track-wrapper">
          {[0, 1].map(pass => (
            <div key={pass} className="saints-track" aria-hidden={pass === 1 ? 'true' : undefined}>
              {filtered.map((saint, i) => <SaintCard key={`${pass}-${i}`} saint={saint} />)}
            </div>
          ))}
        </div>
      )}

      {!loading && isFilterMode && (
        <div className="saints-grid-wrap">
          {filtered.length === 0 ? (
            <div className="saints-no-results">
              <span className="material-symbols-outlined" style={{ fontSize: '3rem', color: '#570013' }}>search_off</span>
              <p>No saints match "<strong>{query}</strong>"</p>
            </div>
          ) : (
            <div className="saints-grid">
              {filtered.map((saint, i) => <SaintCard key={i} saint={saint} />)}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

// 5 Stunning Catholic imagery from Unsplash for guaranteed image loading
const GUARANTEED_FALLBACKS = [
  'https://images.unsplash.com/photo-1548625361-26dd0ca4de21?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1598466847849-c146cbbf0700?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1629853965934-1dccecf9f3b1?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1543336440-a3597d510dc8?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1506059157209-1e3ff210aebc?auto=format&fit=crop&q=80&w=400'
];

function SaintCard({ saint }) {
  const badgeBg = RANK_COLOURS[saint.rank] || '#2b271e';

  // Predictably pick a gorgeous Unsplash fallback based on string length if all else fails
  const guaranteedImg = GUARANTEED_FALLBACKS[saint.name.length % GUARANTEED_FALLBACKS.length];
  const initialImage = saint.image || guaranteedImg;

  return (
    <div className="saint-card">
      <div className="saint-card__img-wrap">
        <img
          src={initialImage}
          alt={saint.name}
          className="saint-card__img"
          onError={(e) => {
            if (e.target.src !== guaranteedImg) e.target.src = guaranteedImg;
          }}
          loading="lazy"
        />
        <div className="saint-card__overlay" />
        <span className="saint-card__rank-badge" style={{ background: badgeBg }}>{saint.rank}</span>
      </div>
      <div className="saint-card__body">
        <p className="saint-card__date">
          <span className="material-symbols-outlined" style={{ fontSize: '0.8rem' }}>calendar_today</span>{' '}{saint.date}
        </p>
        <h3 className="saint-card__name">{saint.name}</h3>
      </div>
    </div>
  );
}



export default function Home() {
  const navigate = useNavigate();

  // Scroll reveal for non-hero sections
  useEffect(() => {
    const sections = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    sections.forEach(s => io.observe(s));
    return () => sections.forEach(s => io.unobserve(s));
  }, []);

  const handleNav = (to) => {
    navigate(to);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const stats = [
    { value: 3200, label: 'Believers', suffix: '+', icon: 'groups' },
    { value: 12, label: 'Clergy Members', suffix: '', icon: 'church' },
    { value: 2800, label: 'Laity Members', suffix: '+', icon: 'volunteer_activism' },
    { value: 1450, label: 'People Baptized', suffix: '+', icon: 'water_drop' },
    { value: 890, label: 'People Confirmed', suffix: '+', icon: 'verified' },
    { value: 65, label: 'Years of Existence', suffix: '+', icon: 'history_edu' },
  ];

  const events = [
    {
      date: 'Oct 24',
      title: 'Parish Harvest Festival',
      desc: 'Join us for a day of gratitude, food, and community celebration as we mark the harvest season.',
      location: 'Parish Hall • 2:00 PM',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqdwKrLrJbKdJX6g0v6Cd67Pcwht541jm4DJigESqG_cdQX2soQVYn8FWpU5WxB47WyE_ItYNq3wTF2ERlS7KrFIDjWBPCbQhCvP7QYKyxH077AWcgfxit2n2Gnv4OUnXgKe3I2Mc_kJzkLScdmaC4ad0rxR8aNmRoNkJ0-tdRV9MGJNg2TSQip8Q8oRnMwi_22Ob99gXczvfUiaxa_kQrUMId5wIxJbQPY4jwBYictXX6Nxgh4WJ8XIPE-RZNpMMEcmIZMN2xp7aZ',
    },
    {
      date: 'Nov 02',
      title: 'All Souls Day Requiem',
      desc: 'A solemn Mass of remembrance for our departed loved ones with special choral accompaniment.',
      location: 'Main Sanctuary • 7:00 PM',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqNxB8bmlMVxBZ-nHePaICMZpqCvxqLOTU0Ok3DAa-eOnxd3DIn6DYfsR898ejBoI3sXE118hFJDlUcx95kpkCatEF-ZfTiH9D-VclFIM1Qb4X_C9vj8T15nnnGoOUxro5OVIOG2NxELvgJObRxqioZmFkuAHuiicQKMVO_8fKjnhbgabmmDYkiP1EW11y3mAMysIzFaWWtPbJdiYqkbi7ySm9qnft63n8TQttlCWn7Pvc1sRWIQZaCuw5zbCCBWZGqdpoUpoCLh9g',
    },
    {
      date: 'Nov 15',
      title: 'St. Vincent de Paul Drive',
      desc: 'Our monthly food and clothing drive to support families in our local community.',
      location: 'East Parking Lot • 9:00 AM',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbdPPfqhzIftwZ5xzd3kCYqiBUA6zYNL1tXC5nkmwjyxrtWVJV9HJEGGCq4imBQtHYWW-ZpICnK-oXVOVryMmDYC5fhxsrFRRKd5GG3Y-TclCnIm8FUUfYAge7eVi4pXJ74hDa99uDe0RCPH0ZJsL9JhhDhM9N1EkSHqCW4vaOWtXBostt6cIxOCOemF13uyCiG6-gB1MnLwRpT0fRYCSTGvN3MTueDOg50wSWt_WuSvIs_sJBZzHYUF7fIW6fP0i8aXmxBPxBrzd4',
    },
  ];

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center transition-transform duration-[10s] hover:scale-105"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBWiHSVc3PEpgWjlg_hBZxOYS2_dwg1rvNrUirXsDtcC9NPdZU0LEDRr8DbBC0sRyc-i094eo0rxA4Lw48AHQGPLNlD7MqsxHc7CZM96BjvneR_SlqBhSJjhPIcGoD0eT4CsMCTt4lumV7viL_oqOYs2IWaSWApzUz7W12akYwv__ZwgD_Dd_5JMrVk7BEgzh7rhZ9h3DwCtnNd6JYvVI5gHv8U5VUbP0VPta9iql_7KvLkNsyrJVGcbfoj7D3sQJVGPcYjHyIpAIgj')`,
            }}
          />
          <div className="hero-overlay absolute inset-0" />
        </div>
        <div className="relative z-10 w-full px-5 md:px-16 max-w-[1400px] mx-auto">
          <div className="max-w-3xl text-white">
            <p className="font-oswald tracking-[0.3em] text-[#ffe088] mb-4 uppercase text-sm animate-fade-in-up">
              ✦ Welcome to Our Parish ✦
            </p>
            <h1 className="text-display-lg mb-6 leading-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Welcome Home to<br />
              <span className="text-[#ffe088]">St. Michael Madende</span>
            </h1>
            <p className="text-body-lg mb-10 opacity-90 max-w-xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              A community rooted in tradition, growing in faith, and united in the love of Christ.
              Join us as we journey together in the heart of our sanctuary.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <button
                onClick={() => handleNav('/mass-schedule')}
                className="btn-primary bg-[#ffe088] text-[#40000b] px-8 py-4 rounded-full font-oswald font-bold text-base uppercase tracking-wide flex items-center justify-center gap-2 shadow-xl"
              >
                <span className="material-symbols-outlined">schedule</span>
                Mass Schedule
              </button>
              <button
                onClick={() => handleNav('/about')}
                className="border-2 border-white/60 text-white px-8 py-4 rounded-full font-oswald font-bold text-base uppercase tracking-wide transition-all hover:bg-white/10 hover:border-white backdrop-blur-sm"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-white/60 animate-bounce">
          <span className="material-symbols-outlined text-3xl">keyboard_arrow_down</span>
        </div>
      </section>

      {/* ── Mass Schedule Quick Access ── */}
      <section className="py-20" style={{ background: 'var(--bg-card)' }}>
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <div className="text-center mb-12">
            <p className="font-oswald tracking-[0.3em] text-[#570013]/60 uppercase text-sm mb-2">Join Us</p>
            <h2 className="text-headline-lg text-[#570013] font-oswald">Mass Times &amp; Devotions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Sunday Mass Card — animated */}
            <div
              className="mass-card md:col-span-4 bg-[#fbf2ed] p-8 rounded-2xl border border-[#e0bfbf] shadow-sm animate-fade-in-up"
              style={{ animationDelay: '0.1s' }}
            >
              {/* Shimmer overlay */}
              <div className="mass-card__shimmer" />
              {/* Floating church icon */}
              <div className="mass-card__float-icon">
                <span className="material-symbols-outlined" style={{ fontSize: '7rem', color: '#570013', opacity: 0.04 }}>church</span>
              </div>
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="w-12 h-12 bg-[#570013] rounded-xl flex items-center justify-center mass-card__icon-wrap">
                  <span className="material-symbols-outlined text-white text-2xl">church</span>
                </div>
                <h3 className="font-oswald font-bold text-2xl text-[#570013]">Sunday Mass</h3>
              </div>
              <div className="space-y-3 relative z-10">
                {[
                  { name: 'Morning Mass', time: '07:30 AM' },
                  { name: 'Parish Mass', time: '09:30 AM' },
                  { name: 'Youth Mass', time: '11:30 AM' },
                ].map(({ name, time }, idx) => (
                  <div
                    key={name}
                    className="mass-time-row-animated flex justify-between items-center border-b border-[#e0bfbf] pb-3 last:border-0"
                    style={{ animationDelay: `${0.3 + idx * 0.12}s` }}
                  >
                    <span className="text-body-md text-[#584141]">{name}</span>
                    <span className="font-oswald font-bold text-[#735c00] bg-[#ffe088]/40 px-3 py-1 rounded-full text-sm mass-time-badge">{time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily Devotion Card — animated */}
            <div
              className="devotion-card md:col-span-8 shadow-xl bg-gradient-to-br from-[#570013] to-[#800020] text-white p-8 rounded-2xl flex flex-col justify-between overflow-hidden relative group animate-fade-in-up"
              style={{ animationDelay: '0.2s' }}
            >
              {/* Animated rings */}
              <div className="devotion-card__ring devotion-card__ring--1" />
              <div className="devotion-card__ring devotion-card__ring--2" />
              {/* Glowing top border */}
              <div className="devotion-card__glow-bar" />
              <div className="relative z-10">
                <h3 className="font-oswald font-bold text-3xl mb-3 text-white">Daily Devotion</h3>
                <p className="text-body-md text-white/80 max-w-lg mb-6">
                  "For where two or three are gathered in my name, there am I among them." — Matthew 18:20
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: 'Mon – Fri', time: '6:30 AM', icon: 'wb_sunny' },
                    { label: 'Saturday', time: '7:00 AM', icon: 'auto_stories' },
                    { label: 'Confession', time: 'Sat 4PM', icon: 'favorite' },
                    { label: 'Adoration', time: 'Fri 5PM', icon: 'flare' },
                  ].map(({ label, time, icon }, idx) => (
                    <div
                      key={label}
                      className="devotion-time-tile bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-default"
                      style={{ animationDelay: `${0.4 + idx * 0.1}s` }}
                    >
                      <span className="material-symbols-outlined text-[#ffe088] mb-1" style={{ fontSize: '1.1rem' }}>{icon}</span>
                      <p className="text-label-md text-white/60 font-oswald">{label}</p>
                      <p className="font-oswald font-bold text-xl mt-0.5 text-white">{time}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Decorative cross/church watermark */}
              <span className="material-symbols-outlined absolute -bottom-10 -right-10 opacity-10 text-[200px] pointer-events-none group-hover:scale-110 transition-transform duration-700 text-white">
                church
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Saints of the Month Marquee ── */}
      <SaintsMarquee />

      {/* ── About Snippet ── */}
      <section className="py-20 overflow-hidden" style={{ background: 'var(--section-alt)' }}>
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div data-reveal-left className="relative">
            {/* Image stretches close to edges */}
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <img
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlZlArr5P9AqDFUUJCJosFkNayO2gKe5Em3JjSxeG5IczCTc0ejXDldY1xmVedbbPOh1wTmavAoLuR9CEtLo2MV7nPBmzSqyv0QfsDJ7CP-23MaexLkV9yYcZlo9qCk0XYMapRikDjx3KGCV5P4rSR-qqzp5ukaprXdp2buIko1oUMNK1tMVLhJz58PmGPPAc9JDsGu1jdCwtw6QW83KO08mcBzkcVs3rIb_KtyGi2AAq1vv90qBoNf3KRESO2xugowzksj2OKcfba"
                alt="Parishioners outside church"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-[#ffe088] text-[#241a00] p-6 rounded-2xl shadow-xl hidden md:block max-w-[220px] border-4 border-white">
              <p className="font-serif text-xl italic leading-snug">"A Sanctuary for All Souls"</p>
            </div>
          </div>
          <div data-reveal-right data-delay="200" className="space-y-5">
            <div className="inline-flex items-center gap-3 text-[#570013]">
              <div className="w-16 h-[2px] bg-[#570013]" />
              <span className="font-oswald tracking-[0.3em] uppercase text-sm font-bold">Our Heritage</span>
            </div>
            <h2 className="text-headline-lg text-[#570013] font-oswald font-bold">
              Steeped in Faith,<br />Driven by Service
            </h2>
            <p className="text-body-lg text-[#584141]">
              Founded over half a century ago, St. Michael Madende has been the spiritual home for generations.
              We are more than just a building; we are a vibrant community committed to the Eucharist,
              spiritual growth, and outreach to those in need.
            </p>
            <p className="text-body-md text-[#584141]">
              Whether you are a lifelong Catholic or searching for a spiritual home, you are welcome here.
              We invite you to explore our ministries, participate in our liturgy, and find your place in our family.
            </p>
            <div className="pt-2">
              <button
                onClick={() => handleNav('/about')}
                className="btn-primary bg-[#570013] text-white px-8 py-3 rounded-full font-oswald font-bold text-sm uppercase tracking-wide shadow-lg inline-flex items-center gap-2"
              >
                Read Our Full History
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Community Statistics (CountUp) ── */}
      <section className="relative py-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#40000b] via-[#570013] to-[#800020]" />
        <div className="absolute inset-0"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBWiHSVc3PEpgWjlg_hBZxOYS2_dwg1rvNrUirXsDtcC9NPdZU0LEDRr8DbBC0sRyc-i094eo0rxA4Lw48AHQGPLNlD7MqsxHc7CZM96BjvneR_SlqBhSJjhPIcGoD0eT4CsMCTt4lumV7viL_oqOYs2IWaSWApzUz7W12akYwv__ZwgD_Dd_5JMrVk7BEgzh7rhZ9h3DwCtnNd6JYvVI5gHv8U5VUbP0VPta9iql_7KvLkNsyrJVGcbfoj7D3sQJVGPcYjHyIpAIgj')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.08,
          }}
        />

        <div className="relative z-10 max-w-[1400px] mx-auto px-5 md:px-8">
          <div className="text-center mb-14">
            <p className="font-oswald tracking-[0.3em] text-[#ffe088]/70 uppercase text-sm mb-3">God's Work Through Us</p>
            <h2 className="font-oswald font-bold text-4xl md:text-5xl text-white mb-4">
              Our Parish <span className="text-[#ffe088]">By the Numbers</span>
            </h2>
            <p className="text-white/70 text-body-md max-w-2xl mx-auto">
              For over six decades, St. Michael Madende has been a beacon of faith, service,
              and community. These numbers reflect the grace of God working through our parish family.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {stats.map((stat, i) => (
              <div key={stat.label}
                data-reveal-bounce
                data-delay={i * 80}>
                <StatCard
                  value={stat.value}
                  label={stat.label}
                  suffix={stat.suffix}
                  icon={stat.icon}
                  delay={i * 100}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Upcoming Events (Full-width image cards) ── */}
      <section className="py-20 w-full" style={{ background: 'var(--bg-card)' }}>
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <p className="font-oswald tracking-[0.3em] text-[#570013]/60 uppercase text-sm mb-2">Stay Connected</p>
              <h2 className="font-oswald font-bold text-4xl text-[#570013]">Upcoming Events</h2>
              <p className="text-body-md text-[#584141] mt-1">Stay connected with our parish life</p>
            </div>
            <button
              onClick={() => handleNav('/events')}
              className="hidden md:flex items-center gap-2 text-[#570013] font-oswald font-bold text-sm uppercase tracking-wide hover:gap-3 transition-all link-slide"
            >
              View Calendar <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>

          {/* Full-width to screen edges grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 rounded-2xl overflow-hidden shadow-2xl">
            {events.map(({ date, title, desc, location, img }, idx) => (
              <div
                key={title}
                {...{ [['data-reveal-left', 'data-reveal-zoom', 'data-reveal-right'][idx]]: '' }}
                data-delay={idx * 120}
                className="group cursor-pointer relative overflow-hidden"
                style={{ minHeight: '420px' }}
              >
                {/* Image fills full card */}
                <img
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  src={img}
                  alt={title}
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* Date badge */}
                <div className="absolute top-4 left-4 bg-[#570013] px-3 py-1.5 rounded-full text-white font-oswald font-bold text-sm tracking-wide shadow-lg z-10">
                  {date}
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <h3 className="font-oswald font-bold text-2xl text-white mb-2 group-hover:text-[#ffe088] transition-colors">
                    {title}
                  </h3>
                  <p className="text-white/80 text-sm line-clamp-2 mb-3">{desc}</p>
                  <div className="flex items-center gap-2 text-[#ffe088]">
                    <span className="material-symbols-outlined text-lg">location_on</span>
                    <span className="font-oswald text-sm tracking-wide">{location}</span>
                  </div>
                  {/* Read more hover line */}
                  <div className="mt-3 flex items-center gap-2 text-white/60 group-hover:text-[#ffe088] transition-colors">
                    <span className="font-oswald text-xs uppercase tracking-widest">Learn More</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </div>
                </div>

                {/* Border between cards */}
                {idx < events.length - 1 && (
                  <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-white/20 hidden md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Donation Module ── */}
      <section className="w-full py-20" style={{ background: 'var(--section-alt)' }}>
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <div data-reveal-zoom className="bg-gradient-to-br from-[#2b271e] to-[#413d33] rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-center gap-10 relative overflow-hidden shadow-2xl">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#ffe088]/5 rounded-full -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#570013]/10 rounded-full -ml-32 -mb-32" />

            <div className="md:w-2/3 relative z-10">
              <p className="font-oswald tracking-[0.3em] text-[#ffe088]/70 uppercase text-sm mb-3">Give Generously</p>
              <h2 className="font-oswald font-bold text-4xl text-white mb-4">Support Our Mission</h2>
              <p className="text-body-lg text-white/70 mb-8 max-w-lg">
                Your generosity allows us to maintain our sacred sanctuary, provide spiritual nourishment,
                and serve those in need in our community. Every gift makes a difference.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => handleNav('/donate')}
                  className="btn-primary bg-[#ffe088] text-[#40000b] px-8 py-3 rounded-full font-oswald font-bold text-sm uppercase tracking-wide shadow-lg"
                >
                  Give Online Now
                </button>
                <button className="border-2 border-white/30 text-white px-8 py-3 rounded-full font-oswald font-bold text-sm uppercase tracking-wide hover:bg-white/10 transition-all">
                  Other Ways to Give
                </button>
              </div>
            </div>
            <div className="md:w-1/3 flex justify-center items-center relative z-10">
              <div className="w-36 h-36 rounded-full bg-[#ffe088]/10 border-2 border-[#ffe088]/30 flex items-center justify-center">
                <span className="material-symbols-outlined text-[#ffe088] text-8xl">volunteer_activism</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Gospel of the Day ── */}
      <section className="bg-[#2b271e] text-white py-24">
        <div data-reveal-spin className="max-w-[1400px] mx-auto px-5 md:px-8 text-center">
          <div className="w-16 h-16 rounded-full bg-[#ffe088]/10 flex items-center justify-center mx-auto mb-8">
            <span className="material-symbols-outlined text-[#ffe088] text-3xl">menu_book</span>
          </div>
          <p className="font-oswald tracking-[0.3em] text-[#ffe088] uppercase text-sm mb-6">Word of the Day</p>
          <blockquote className="font-serif text-3xl md:text-4xl text-[#ffdada] italic max-w-3xl mx-auto leading-relaxed mb-6">
            "I am the way, the truth, and the life. No one comes to the Father except through me."
          </blockquote>
          <cite className="text-body-md text-[#cdc6b8] opacity-80">— John 14:6</cite>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => handleNav('/mass-schedule')}
              className="btn-primary bg-[#ffe088] text-[#40000b] px-8 py-3 rounded-full font-oswald font-bold text-sm uppercase tracking-wide"
            >
              Mass Times
            </button>
            <button
              onClick={() => handleNav('/contact')}
              className="border-2 border-white/30 text-white px-8 py-3 rounded-full font-oswald font-bold text-sm uppercase tracking-wide hover:bg-white/10 transition-all"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </>
  );
}