import React from "react";

const styles = {
    backgroundColor: "#FFFFFF",
    textAlign: "center",
    padding: "20px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "60px",
    width: "100%",
};

const phantom = {
  display: 'block',
  padding: '20px',
  height: '60px',
  width: '100%',
  paddingTop:"60px"
};

function Footer() {
    return (
        <div>
            <div style={phantom}>
                <footer style={styles}>
                    <small>&copy; Task Boss 2023</small>
                </footer>
            </div>
        </div>
    );
}

export default Footer;
