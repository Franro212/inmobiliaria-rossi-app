import { Button } from "@chakra-ui/react";
import styles from "./modal.module.css";
function ModalComponent({
  title,
  desc,
  isOpen,
  handleClose,
  confirmModal,
  deleteFunction,
}) {
  return isOpen ? (
    confirmModal ? (
      <div className={styles.modal}>
        <div className={styles.modalContainer} data-testid="modal-confirm">
          <h3>{title}</h3>
          <p>{desc}</p>
          <div className={styles.btnsContainer}>
            <Button size='lg' type="button" onClick={handleClose}>
              Cancelar
            </Button>
            <Button  size='lg'backgroundColor={"var(--red)"} color={"var(--white)"} onClick={deleteFunction} type="button">
              Confirmar
            </Button>
          </div>
        </div>
      </div>
    ) : (
      <div className={styles.modal}>
        <div className={styles.modalContainer} data-testid="modal-success">
          <h3>{title}</h3>
          <p>{desc}</p>
          <div className={styles.btnContainer}>
            <Button size='lg'  onClick={handleClose} type="button">Aceptar</Button>
          </div>
        </div>
      </div>
    )
  ) : null;
}

export default ModalComponent;
