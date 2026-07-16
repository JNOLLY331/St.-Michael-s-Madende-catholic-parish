const res = await fetch("http://localhost:8000/api/events/?is_published=true");
const data = await res.json();
console.log(data);
