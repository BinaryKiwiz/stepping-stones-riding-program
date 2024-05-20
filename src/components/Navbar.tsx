import "./Navbar.css";
import logo from "../assets/logo-long-text.png";
import React, { forwardRef, useState, useEffect } from "react";

const Navbar = forwardRef(
  (
    props: {
      homeRef: React.RefObject<HTMLDivElement>;
      missionRef: React.RefObject<HTMLDivElement>;
      lessonsRef: React.RefObject<HTMLDivElement>;
      aboutRef: React.RefObject<HTMLDivElement>;
      volunteerRef: React.RefObject<HTMLDivElement>;
      activitiesRef: React.RefObject<HTMLDivElement>;
      contactRef: React.RefObject<HTMLDivElement>;
      usedLink: boolean;
      setUsedLink: React.Dispatch<React.SetStateAction<boolean>>;
      isMobile: boolean;
    },
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    const [prevScrollPos, setPrevScrollPos] = useState<number>(0);
    const [visible, setVisible] = useState<boolean>(true);
    const [mouseVisible, setMouseVisible] = useState<boolean>(false);
    const [hamburgerClicked, setHamburgerClicked] = useState<boolean>(false);

    const handleScroll = (): void => {
      if (props.usedLink) {
        setVisible(true);
        return;
      }

      const currentScrollPos: number = window.scrollY;

      if (currentScrollPos > prevScrollPos) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      setPrevScrollPos(currentScrollPos);
    };
    const handleScrollEnd = () => {
      if (props.usedLink) {
        props.setUsedLink(false);
      }
    };
    const handleEnter = () => {
      if (!visible) {
        setVisible(true);
        setMouseVisible(true);
      }
    };
    const handleLeave = () => {
      if (mouseVisible) {
        setVisible(false);
        setMouseVisible(false);
      }
    };

    useEffect(() => {
      if (!props.usedLink) {
        setVisible(true);
      }
    }, [props.usedLink]);

    useEffect(() => {
      window.addEventListener("scroll", handleScroll);
      window.addEventListener("scrollend", handleScrollEnd);
    });

    const handleClick = (ref: React.RefObject<HTMLDivElement>) => {
      if (ref.current) {
        props.setUsedLink(true);
        ref.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    };

    const handleHamburgerClick = () => {
      setHamburgerClicked(!hamburgerClicked);
    };

    if (props.isMobile) {
      return (
        <div className="navbar-container" ref={ref}>
          <div className="sticky-container-mobile">
            <img src={logo} className="logo-mobile"></img>
          </div>
          <hr className="divider"></hr>
          <div
            className={`sliding-nav-container ${
              visible || hamburgerClicked
                ? "nav-container-visible"
                : "nav-container-hidden"
            }`}
          >
            <span className="nonprofit-text-mobile">
              A 501(c)(3) Nonprofit Organization
            </span>
            <button
              className="hamburger"
              style={{
                visibility: hamburgerClicked ? "hidden" : "visible",
              }}
              onClick={handleHamburgerClick}
            ></button>
            <button
              className="x-button"
              onClick={handleHamburgerClick}
              style={{
                visibility: hamburgerClicked ? "visible" : "hidden",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
              >
                <line x1="0" y1="0" x2="15" y2="15" stroke="black" />
                <line x1="15" y1="0" x2="0" y2="15" stroke="black" />
              </svg>
            </button>
          </div>
          <div
            className={`link-dropdown ${
              hamburgerClicked
                ? "link-dropdown-visible"
                : "link-dropdown-hidden"
            }`}
          >
            <a className="nav-link" onClick={() => handleClick(props.homeRef)}>
              HOME
            </a>
            <span></span>
            <a
              className="nav-link"
              onClick={() => handleClick(props.missionRef)}
            >
              OUR MISSION
            </a>
            <a className="nav-link" onClick={() => handleClick(props.aboutRef)}>
              ABOUT US
            </a>
            <a
              className="nav-link"
              onClick={() => handleClick(props.lessonsRef)}
            >
              LESSONS
            </a>
            <a
              className="nav-link"
              onClick={() => handleClick(props.activitiesRef)}
            >
              ACTIVITIES
            </a>
            <a
              className="nav-link"
              onClick={() => handleClick(props.volunteerRef)}
            >
              VOLUNTEER
            </a>
            <a
              className="nav-link"
              onClick={() => handleClick(props.contactRef)}
            >
              CONTACT US
            </a>
          </div>
        </div>
      );
    }

    return (
      <div
        className="navbar-container"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        ref={ref}
      >
        <div className="sticky-container">
          <img src={logo} className="logo"></img>
          <div className="nonprofit-text">
            A 501(c)(3) Nonprofit Organization
          </div>
        </div>
        <hr className="divider"></hr>
        <div
          className={`nav-container ${
            visible ? "nav-container-visible" : "nav-container-hidden"
          }`}
        >
          <a className="nav-link" onClick={() => handleClick(props.homeRef)}>
            HOME
          </a>
          <div className="links-container">
            <a
              className="nav-link"
              onClick={() => handleClick(props.missionRef)}
            >
              OUR MISSION
            </a>
            <a className="nav-link" onClick={() => handleClick(props.aboutRef)}>
              ABOUT US
            </a>
            <a
              className="nav-link"
              onClick={() => handleClick(props.lessonsRef)}
            >
              LESSONS
            </a>
            <a
              className="nav-link"
              onClick={() => handleClick(props.activitiesRef)}
            >
              ACTIVITIES
            </a>
            <a
              className="nav-link"
              onClick={() => handleClick(props.volunteerRef)}
            >
              VOLUNTEER
            </a>
            <a
              className="nav-link"
              onClick={() => handleClick(props.contactRef)}
            >
              CONTACT US
            </a>
          </div>
        </div>
      </div>
    );
  }
);

export default Navbar;
