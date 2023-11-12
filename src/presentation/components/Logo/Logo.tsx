
import PropTypes from "prop-types";
import "./style.css";

interface Props {
  black: boolean;
  text: boolean;
  blackYesTextYesClassName: any;
  vectorClassName: any;
  vector: string;
  divClassName: any;
  divClassNameOverride: any;
}

export const Logo = ({
  black,
  text,
  blackYesTextYesClassName,
  vectorClassName,
  vector = "/img/vector.svg",
  divClassName,
  divClassNameOverride,
}: Props): JSX.Element => {
  return (
    <>
      {text && (
        <div className={`logo black-${black} ${blackYesTextYesClassName}`}>
          {black && (
            <>
              <img className={`vector ${vectorClassName}`} alt="Vector" src={vector} />
              <div className={`text-wrapper ${divClassName}`}>LAVU’s</div>
              <div className={`div ${divClassNameOverride}`}>Restaurant</div>
            </>
          )}

          {!black && (
            <div className="div-2">
              <img className="vector" alt="Vector" src="/img/black-no-text-no.svg" />
              <div className="text-wrapper-2">LAVU’s</div>
              <div className="text-wrapper-3">Restaurant</div>
            </div>
          )}
        </div>
      )}

      {!text && (
        <img
          className={`logo black-no-text-no ${blackYesTextYesClassName}`}
          alt="Black no text no"
          src={black ? "/img/black-yes-text-no.svg" : "/img/black-no-text-no.svg"}
        />
      )}
    </>
  );
};

Logo.propTypes = {
  black: PropTypes.bool,
  text: PropTypes.bool,
  vector: PropTypes.string,
};
