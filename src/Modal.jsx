// eslint-disable-next-line
function Modal({ setOpenModal, handleFormData, showOccurrence, occurrence }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "0.1rem 0",
            width: "50%",
            marginLeft: "auto",
            marginRight: "auto",
            height: "120px" /* Set a fixed height */,
            objectFit: "cover",
          }}
        >
          <img
            src="https://www.uxlivinglab.org/wp-content/uploads/2023/10/image_1-3.png"
            alt="Dowell Logo"
          />
        </div>

        <hr className="col-md-11" />
        <div className="title">
          <h2>Experiencing: {occurrence} occurrence</h2>
        </div>
        <div className="body flex">
          <p className="w-full mb-3 justify-content-center align-items-center sm:text-[10px]">
            <i>
              {showOccurrence &&
                occurrence < 4 &&
                occurrence !== null &&
                `You reach ${occurrence} occurrence crawl again!`}
              {showOccurrence &&
                occurrence >= 4 &&
                occurrence !== null &&
                `Do you have a coupon? {Yes}`}

              {showOccurrence &&
                occurrence >= 6 &&
                occurrence !== null &&
                `Maximum experience limit reached!`}
            </i>
          </p>
        </div>
        <div className="footer mb-3 d-flex justify-content-center">
          <button
            type="submit"
            style={{
              color: "#fff",
              backgroundColor: occurrence >= 6 ? `#198754` : `#005734`,
            }}
            onClick={() => {
              setOpenModal(false);
              handleFormData();
            }}
          >
            {occurrence === 0 ||
            occurrence === 1 ||
            occurrence === 2 ||
            occurrence === 3 ||
            occurrence === 4 ||
            occurrence === 5
              ? `Continue`
              : occurrence >= 6
              ? `Contribute`
              : `Continue`}
          </button>

          {(occurrence === 4 || occurrence === 5) && (
            <button
              type="button"
              className="btn"
              style={{
                color: "#fff",
                backgroundColor: "#198754",
                marginLeft: "0.5rem", // Add some right margin for spacing
              }}
            >
              Contribute
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
