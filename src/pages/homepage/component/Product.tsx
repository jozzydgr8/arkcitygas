import { serviceValues } from "../../../data";
import { FlatButton } from "../../../shared/FlatButton";
import { Link } from "react-router-dom";







export const Product = () => {
 
  

  

  return (
    <section>
      <div className="container-fluid">
        <h2>Categories</h2>
        <div className="servicegrid">
          {serviceValues.map((service, index) => (
            <Link
            to={`/arkcitygas/${service.title}`}
              key={index}
              className="servicegridcontent animate-up"
              style={{
                border: "solid 1px #d7d9d6",
                color: "black",
                borderRadius: "20px",
                background: "white",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                textDecoration: "none",
              }}
            >
              {/* Top image section */}
              <div
                style={{
                  backgroundImage: `url(${service.backgroundImage})`,
                  height: "200px",
                  backgroundSize: "cover",
                  backgroundPosition: "center center",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>

              {/* Content section */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  padding: "15px",
                }}
              >
                <h3
                  style={{ textTransform: "capitalize" }}
                   
                >{service.title }</h3>
                <p>{service.description}</p>

                {/* Button to open modal */}
                <div style={{ marginTop: "auto" }}>
                  <FlatButton
                    className="btndark"
                    onClick={() => console.log('')}
                    title={`VIEW NOW`}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>

       
      </div>
    </section>
  );
};
