import "./ModalWithForm.css";

function ModalWithForm({ children, title, buttonText, activeModal, onClose }) {
  return (
    <div className={`modal ${activeModal === "add-garment" && "modal_opened"}`}>
      <div className="modal__container">
        <button
          onClick={onClose}
          className="modal__close-button"
          type="button"
        ></button>
        <h2 className="modal__title">{title}</h2>
        <form className="modal__form" noValidate>
          {children}
          <button className="modal__submit-button" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
export default ModalWithForm;

/*
ModalWithForm is a wrapper for our form components. 
We need to ensure that the component will support 
multiple forms, even though you’ll only create the 
first form at this stage.

To do so, all the markup that’s common to all of the 
forms should be placed inside this component. 
You should include the following:

    The form’s title.
    The button that closes the modal.
    The <form> tag itself.
    The button that submits the modal.

The title, button text, and form identifier 
(in the form of strings) should be passed from 
outside the component itself. To do this, add the 
corresponding title, name, and buttonText props, 
then substitute their values inside the JSX.

To correctly substitute name into the CSS class 
of the container, use the following syntax:

className={`modal modal_type_${name}`}

The value of the name props will not only be 
used for the name of the CSS class container, 
but also for the name attribute of the form tag.

The rest of the content (i.e., the inputs and 
their labels) will vary from form to form. These 
should be added as children of ModalWithForm, 
and then accessed via the special children prop.

One more prop is onClose, which should be 
called when the user clicks on the close button, 
clicks outside of the modal content, or presses 
the Escape button on the keyboard.

💡 When styling the form fields, pay close 
attention to how the styles differ depending on 
the state of the element’s state. To refresh 
your memory about how to style form elements, 
refer back to the relevant lessons in the form 
chapter from sprint 2.
*/
