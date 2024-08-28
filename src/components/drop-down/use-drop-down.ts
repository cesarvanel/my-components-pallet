import { useState } from "react"

interface useDropDownBehavior{
   onClose: () => void, 
   toggleDropdown: () => void,
   isOpen: boolean
}

export const useDropDown = ():useDropDownBehavior =>{

   const [isOpen, setIsOpen] = useState<boolean>(false)

   const onClose = () =>{
      setIsOpen(false)
   }
   const toggleDropdown = () =>{
      setIsOpen(!isOpen)
   }

   return{
      onClose, 
      toggleDropdown,
      isOpen
   }
}