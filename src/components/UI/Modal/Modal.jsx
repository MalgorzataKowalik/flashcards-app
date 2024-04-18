import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styles from './Modal.module.css'

export default function Modal({children, open, onClose, onCancel}) {
  const dialogRef = useRef()

  useEffect(() => {
    if (open) {
      dialogRef.current.showModal()
    }

    return () => {
      dialogRef.current && dialogRef.current.close()
    }
  }, [open])

  return (
    createPortal(
    <dialog ref={dialogRef} className={styles.modal} onClose={onClose} onCancel={onCancel}>
      <div className={styles["modal-wrapper"]}>
        {children}
      </div>
    </dialog>,
    document.getElementById("modal"))
  )
}