import { useEffect } from 'react';
import { MdClose } from 'react-icons/md';

import './GospelReadingModal.css';

/**
 * A self-contained, scrollable dialog that reveals the full text of the
 * day's reading. White background + Arial body text for maximum clarity.
 */
export default function GospelReadingModal({ gospel, onClose }) {
  // Close on Escape, lock body scroll while open
  useEffect(() => {
    const onKeyDown = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <div
      className="gospel-modal-backdrop"
      role="presentation"
      onClick={onClose}
    >
      <div
        className="gospel-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="gospel-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Burgundy header band ── */}
        <div className="gospel-modal-header">
          <button
            type="button"
            className="gospel-modal-close"
            onClick={onClose}
            aria-label="Close reading"
          >
            <MdClose />
          </button>

          <p className="gospel-modal-eyebrow">✦ Daily Reading ✦</p>
          <p className="gospel-modal-date">{gospel.date}</p>
          <p id="gospel-modal-title" className="gospel-modal-book">{gospel.book}</p>
          <p className="gospel-modal-citation">{gospel.citation}</p>
        </div>

        {/* ── White scrollable body ── */}
        <div className="gospel-modal-body">
          <div className="gospel-modal-body-inner">
            <p className="gospel-modal-text">{gospel.text}</p>

            {/* Reference footer */}
            <div className="gospel-modal-ref">
              <span className="gospel-modal-ref-dot" />
              <span className="gospel-modal-ref-text">
                {gospel.book} {gospel.citation} · Roman Catholic Lectionary
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
