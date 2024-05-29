import React, { useEffect, useState } from "react";
// import { BotHeader } from "./BotHeader";
// import { TopHeader } from "./TopHeader";
//import { SearchModal } from "@/components/Dashboard/SearchModal"
// import SearchModal from "@/components/Search/SearchModal";

const Header = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  //use ctrl + k to open the search modal
  //use command + k to open the search modal on mac
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        (event.ctrlKey && event.key === "k") ||
        (event.metaKey && event.key === "k")
      ) {
        openModal();
      }
      if (event.key === "Escape") {
        closeModal();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      closeModal();
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const onClose = () => {
    setModalOpen(false);
    closeModal();
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return <p>GREETINGS FROM THE HEADER</p>;
};

export default Header;
