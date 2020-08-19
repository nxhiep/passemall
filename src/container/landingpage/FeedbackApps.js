import { Grid } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import React from 'react';
import Slider from "react-slick";
import { FixedContainer, TitleBlock } from '../../components/Widgets';
import { formatDate } from '../../utils';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const FeedbackAppsUI = ({ userRateState }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: isMobile ? 1 : 3,
        slidesToScroll: isMobile ? 1 : 3,
        className: "feedback-slider",
    };
    let userRates = [];
    for (let i = 0; i < userRateState.length; i++) {
        if (i < 6) {
            userRates.push(userRateState[i]);
        } else {
            break;
        }
    }
    return (
        <section className="feedback-apps">
            <FixedContainer>
                <TitleBlock
                    title="What our clients say"
                />
                <Slider {...settings}>
                    {
                        userRates.map((userRate) => {
                            return <FeedbackItem
                                key={"FeedbackItem-" + userRate.id}
                                value={5}
                                content={userRate.content}
                                name={userRate.userName}
                                createTime={userRate.createDate}
                            />
                        })
                    }
                </Slider>
            </FixedContainer>
        </section>
    );
}

const FeedbackItem = ({
    value = 0,
    content = '',
    name = '',
    createTime = 0,
}) => {
    return (
        <div className="feedback-item">
            <div>
                <Rating size="small" value={value} readOnly />
                <p className="dot-7">{content}</p>
                <br />
                <Grid container alignItems="center" className="info">
                    <span className="border"></span>
                    <div>
                        <strong>{name}</strong>
                        <div >{formatDate(createTime)}</div>
                    </div>
                </Grid>
            </div>
        </div>
    );
}


export default FeedbackAppsUI;