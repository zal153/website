import { Icon } from "./Icon";
import type { Material } from "../types";
import { money } from "../utils/format";

type MaterialCardProps = {
  material: Material;
  onSelect: (material: Material) => void;
};

export function MaterialCard({ material, onSelect }: MaterialCardProps) {
  return (
    <article className="material-card">
      <button
        className={`material-image ${material.color}`}
        onClick={() => onSelect(material)}
        aria-label={`Detail ${material.name}`}
      >
        {material.image ? (
          <img
            src={material.image}
            alt={material.name + " untuk dipilah dan didaur ulang"}
            loading="lazy"
          />
        ) : (
          <div className="material-art">
            <Icon name={material.icon} size={78} />
            <span>{material.name.toUpperCase()}</span>
          </div>
        )}
        <span className="material-badge">
          <Icon name={material.icon} size={12} />
          {material.category}
        </span>
        <span className="image-arrow">
          <Icon name="arrow" size={18} />
        </span>
      </button>
      <div className="material-info">
        <div className="material-title">
          <button onClick={() => onSelect(material)}>{material.name}</button>
          <span>CONTOH HARGA</span>
        </div>
        <p>{material.examples}</p>
        <div className="material-bottom">
          {material.price > 0 ? (
            <strong>
              {money(material.price)}
              <small> / kg</small>
            </strong>
          ) : (
            <strong className="price-check">Perlu pengecekan</strong>
          )}
          <button className="text-link" onClick={() => onSelect(material)}>
            Detail material <Icon name="arrow" size={14} />
          </button>
        </div>
      </div>
    </article>
  );
}
