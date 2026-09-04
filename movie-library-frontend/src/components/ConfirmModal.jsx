function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
        <p>{message}</p>
        <div className="confirm-modal-actions">
          <button className="confirm-btn-danger" onClick={onConfirm}>Sil</button>
          <button className="confirm-btn-cancel" onClick={onCancel}>İptal</button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal