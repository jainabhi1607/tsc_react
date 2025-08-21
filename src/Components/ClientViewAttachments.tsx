import { encryptPhpCompatible, decryptPhpCompatible} from "../cryptoHelper";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox.css";

//encrypt(text)

function ClientViewAttachments(props) {
  let counter = 1;

  return (
    <>
      {props.data &&
        Object.values(props.data).length > 0 &&
        Object.values(props.data).map((result) => {
          let fileExtension = result.file_name.split(".").pop().toLowerCase();
          if (
            fileExtension === "pdf" ||
            fileExtension === "doc" ||
            fileExtension === "docx"
          ) {
            let first = encryptPhpCompatible(result.id.toString()+'first');
            let second = encryptPhpCompatible(result.id.toString()+'Second');
            let file_encrypted = encryptPhpCompatible(result.file_name.toString());
            let id_encrypted = encryptPhpCompatible(result.id.toString());





            return (
              <>
                <div className="col-lg-12 paddR0 paddL0">
                  <label>{result.document_name}</label>
                  <label className="float-right document_attachments">
                    {props.userRole < 4 && (
                      <a
                        href={`https://app.totalsprayboothcare.com/users/openPdfAwsFile/${first}/${second}/${file_encrypted}/{result.file_name}`}
                        dir={result.id}
                        className="public_private"
                      >
                        {result.visibility === 2 ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#83CE67"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="feather feather-eye marR10"
                          >
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#465868"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="feather feather-eye-off marR10"
                          >
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                            <line x1="1" y1="1" x2="23" y2="23"></line>
                          </svg>
                        )}
                      </a>
                    )}

                    <a
                      target="_blank"
                      href={`https://app.totalsprayboothcare.com/users/openPdfAwsFile/${first}/${second}/${file_encrypted}/${result.file_name}`}
                      className="marR20"
                    >
                      <span className="external-icon icons"></span>
                    </a>
                    {props.userRole < 4 && (
                      <>
                        <a
                          href="javascript:void(0)"
                          className="add_edit_document_name marR20"
                        >
                          <span className="edit-icon icons"></span>
                        </a>
                        <a
                          onClick="return confirm('Are you sure?')"
                          href="javascript:void(0)"
                        >
                          <span className="trash-icon icons"></span>
                        </a>
                      </>
                    )}
                  </label>
                </div>
              </>
            );
          }
        })}
      {props.data &&
        Object.values(props.data).length > 0 &&
        Object.values(props.data).map((result) => {
          let fileExtension = result.file_name.split(".").pop().toLowerCase();
          if (
            fileExtension === "jpg" ||
            fileExtension === "jpeg" ||
            fileExtension === "png" ||
            fileExtension === "gif"
          ) {
            return (
              <>
                <div className="col-lg-4 paddL0">
                  <div className="<?php if($session->read('User.role') < 4) echo 'note-box';?> marB10">
                    <div>
                      <div className="clear paddB5"></div>

                      <span className="image_span">
                        <a
                          data-toggle="modal"
                          className="aws_images img-thumbnail image-thumb"
                          data-index={counter}
                          data-product-id={result.id}
                          rel={result.id}
                        >
                          <img
                            src={`https://app.totalsprayboothcare.com/support_ticket_img/${result.file_name}`}
                            data-index={counter}
                            data-product-id={result.id}
                            rel={result.id}
                          />
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
              </>
            );
            counter++;
          }
        })}
    </>
  );
}

export default ClientViewAttachments;
