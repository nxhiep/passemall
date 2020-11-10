import { CircularProgress, Container } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import { TitleBlock } from '../../components/Widgets';
import { callApi } from '../../services';
const FeedbackAppsUI = () => {
    const [userRates, setUserRates] = useState(null);
    useEffect(() => {
        callApi({ url: '/data?type=get_user_rates_perfectest', params: null, method: 'post' }).then((data) => {
            if(data){
                setUserRates(data.slice(0, 3))
            } else {
                setUserRates([])
            };
        })
    }, []);

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
    if(!userRates){
        return <CircularProgress />
    }
    if(userRates.length == 0){
        return null
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