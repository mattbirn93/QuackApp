export interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  onAdd: (
    newTitle: string,
    newWrittenBy: string,
    newAddress: string,
    newPhoneNumber: string,
  ) => void;
}
