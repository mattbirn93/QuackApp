export interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  writtenBy: string;
  address: string;
  phoneNumber: string;
  onEdit: (
    newTitle: string,
    newWrittenBy: string,
    newAddress: string,
    newPhoneNumber: string,
  ) => void;
  onDelete: () => void;
}
