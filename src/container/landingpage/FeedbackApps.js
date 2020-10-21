import React from 'react';
import Slider from "react-slick";
import { TitleBlock } from '../../components/Widgets';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Container } from '@material-ui/core';
const FeedbackAppsUI = ({ userRateState }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.between(0, 960));
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: isMobile ? 1 : 3,
        slidesToScroll: isMobile ? 1 : 3,
        className: "feedback-slider",
        autoPlay: true,
        autoplaySpeed: 1500,
        arrows: false
    };
    let userRates = [];
    for (let i = 0; i < userRateState.length; i++) {
        if (i < 3) {
            userRates.push(userRateState[i]);
        } else {
            break;
        }
    }
    return (
        <section className="feedback-apps">
            <Container>
                {isMobile ? null : (
                    <>
                        <div className="divider"></div>
                        <div style={{ textAlign: "center", marginTop: "4px" }}>
                            <strong style={{ color: "#4E63BD", fontSize: "20px" }}>ABC</strong>
                            <strong style={{ position: "relative", color: "#FA8E45", left: "4px", marginLeft: "auto", marginRight: "auto", fontSize: "20px" }}>E-learning</strong>
                        </div>
                        <TitleBlock
                            title="WHAT OUR CLIENTS SAY"
                        />
                    </>)
                }
                <Slider {...settings}>
                    {
                        userRates.map((userRate, index) => {
                            return <FeedbackItem
                                key={"FeedbackItem-" + userRate.id}
                                content={userRate.content}
                                name={userRate.userName}
                                createTime={userRate.createDate}
                                index={index}
                            />
                        })
                    }
                </Slider>
            </Container>
        </section>
    );
}

const FeedbackItem = ({
    content = '',
    name = '',
    index
}) => {
    return (
        <div className="feedback-item">
            <div>
                <img className="avatar" src={index % 3 === 0 ? "/images/avatar-1.png" : (index % 3 === 1 ? "/images/avatar-2.png" : "/images/avatar-3.png")} alt="avatar"></img>
                <div className="info">
                    <strong>{name}</strong>
                    <div className="overflow">{content}</div>
                </div>
            </div>
        </div>
    );
}


export default FeedbackAppsUI;