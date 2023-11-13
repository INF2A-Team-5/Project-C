import React, { FunctionComponent, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Button from '../foundations/button'

const styles = {
    hierarchy: {
      sm: "modal-sm",
      md: "modal-md",
    },
  };

export interface ModalProps  {
    hierarchy?: "sm" | "md";
    isShown: boolean;
    hide: () => void;
    modalContent: JSX.Element;
    headerText: string;
  }

//   export const Modal: FunctionComponent<ModalProps> = ({
//     isShown,
//     hide,
//     modalContent,
//     headerText,


    
//   }) => {
//     const modal = (
//         <React.Fragment>
//         <Backdrop />
//         <Wrapper>
//           <StyledModal>
//             <Header>
//               <h1>{headerText}</h1>
//               <CloseButton onClick={hide}>X</CloseButton>
//             </Header>
//             <Content>{modalContent}</Content>
//           </StyledModal>
//         </Wrapper>
//       </React.Fragment>
//     );

    function Modal({ hierarchy = "md",...props }: ModalProps) {
        return (
            <div className="popup" onClick="myFunction()">Click me!
            <span class="popuptext" id="myPopup">Popup text...</span>
          </div>
        );
      }

    export default Modal;