import Image from "next/image";

import TableComponent from "../TableComponent";
import styles from "./styles.module.scss";

export default function Constellations({ data, vision }) {
  return (
    <TableComponent title={"Constellations"} vision={vision}>
      <div className={styles.contellations_container}>
        {data.list.map((item, index) => (
          <div key={index} className={styles.constellation}>
            <div className={styles.constellation_title}>
              <div className={styles.icon}>
                <Image
                  src={item.icon_url}
                  alt={"Constellation_Icon"}
                  width={50}
                  height={50}
                />
              </div>
              <div className={styles.name}>
                <h4>{item.name}</h4>
              </div>
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: item.desc }}
              className={styles.contellation_desc}
            ></div>
          </div>
        ))}
      </div>
    </TableComponent>
  );
}
