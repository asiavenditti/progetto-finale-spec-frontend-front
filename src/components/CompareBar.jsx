import { useContext } from "react";
import { createPortal } from "react-dom";
import { GlobalContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";
import { XCircleFill, ArrowRight, Stars } from "react-bootstrap-icons";
import "../style/CompareBar.css"

export default function CompareBar() {
  const { compareList, toggleCompare } = useContext(GlobalContext);

  if (!compareList || compareList.length === 0) return null;

  return createPortal(
    <div className="compare-bar-portal">
      <div className="compare-bar-content">

        <div className="d-flex align-items-center gap-4">
          <div className="d-flex gap-3 align-items-center">
            {compareList.map((car) => (
              <div key={car.id} className="compare-thumb-wrapper">
                <img
                  src={car.image}
                  alt={car.title}
                  style={{ width: '75px', height: 'auto', maxHeight: '45px', objectFit: 'contain' }}
                />
                <button
                  className="border-0 bg-white text-danger position-absolute"
                  onClick={() => toggleCompare(car)}
                  style={{
                    top: '-5px',
                    right: '-5px',
                    borderRadius: '50%',
                    padding: '0',
                    display: 'flex',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }}
                >
                  <XCircleFill size={18} />
                </button>
              </div>
            ))}
          </div>

          <div className="d-none d-lg-block">
            <span className="compare-status-text">

              {compareList.length === 1 ? "Aggiungi un'altra vettura " : "Pronto al confronto"}
            </span>
          </div>
        </div>

        <Link to="/compare" className="btn-compare-main">
          <span>Confronta</span>
          <ArrowRight size={20} />
        </Link>

      </div>
    </div>,
    document.body
  );
}