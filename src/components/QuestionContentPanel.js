import { Grid } from '@material-ui/core';
import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { connect } from 'react-redux';
import { showImageDialog } from '../redux/actions/appValue';
import { useRouter } from 'next/router';

export var TextContentType;
(function (TextContentType) {
    TextContentType[TextContentType["question"] = 1] = "question";
    TextContentType[TextContentType["answer"] = 2] = "answer";
    TextContentType[TextContentType["explanation"] = 3] = "explanation";
})(TextContentType || (TextContentType = {}));

const QuestionContentPanel = ({ content, image = '', type = TextContentType.question, showImageDialog, appInfoState }) => {
    const router = useRouter();
    const { appNameId } = router.query;
    let bucket = appInfoState.bucket;
    // content = content.replace(/\n/g, "<br/>").replace(/\\u(....)/g, "&#x$1;");
    if (type === TextContentType.question) {
        return <TextContentQuestion content={content} image={image} showImageDialog={showImageDialog} type={type} bucket={bucket} />
    }
    return <TextContent content={content} type={type} bucket={bucket} />
}

const getUrlImage = (bucket, name) => {
    return 'https://storage.googleapis.com/micro-enigma-235001.appspot.com/' + bucket + '/images/' + name;
}

const TextContent = ({ content, type, bucket }) => {
    let result = content.split('$').map((str) => {
        if (isImage(str)) {
            let size = getSizeImage(str);
            return '<img style="cursor:pointer;display:inline-block;vertical-align:middle" alt="" src="' + getUrlImage(bucket, str) + '" width="' + size.width + '" height="' + size.height + '" />'
        }
        return str;
    }).join('');
    return (
        <div style={type == TextContentType.explanation ? { marginBottom: '10px' } : {}}>{ReactHtmlParser(result)}</div>
    );
}

const TextContentQuestion = ({ content, image, showImageDialog, type, bucket }) => {
    if (!image) {
        if (hasImage(content)) {
            return <TextContent content={content} type={type} bucket={bucket} />;
        }
        return (
            <div>{ReactHtmlParser(content)}</div>
        );
    }
    let imageUrl = getUrlImage(bucket, image);
    console.log("imageUrl", imageUrl)
    return (
        <Grid
            container
            direction="row"
            alignItems="flex-start"
            style={{ marginBottom: '10px' }}
        >
            <Grid item xs={9}
            >
                {ReactHtmlParser(content)}
            </Grid>
            <Grid item xs={3}>
                <img
                    className="image-in-question"
                    width="100%"
                    src={imageUrl} alt=""
                    onClick={() => showImageDialog(imageUrl)}
                />
            </Grid>
        </Grid>
    );
}

function hasImage(str) {
    return (!!str) && (str.includes(".png") || str.includes(".jpg")
        || str.includes(".gif") || str.includes(".tiff") || str.includes(".bmp"));
}

function isImage(str) {
    return (!!str) && (str.endsWith(".png") || str.endsWith(".jpg")
        || str.endsWith(".gif") || str.endsWith(".tiff") || str.endsWith(".bmp"));
}

function getSizeImage(str) {
    let i1 = str.indexOf('_'), i2 = str.lastIndexOf('.');
    if (i1 > -1 && i2 > -1) {
        let sizeStr = str.substring(i1, i2);
        let i3 = sizeStr.indexOf('_w'), i4 = sizeStr.lastIndexOf('_h');
        let width = sizeStr.substring(i3 + 2, i4);
        let height = sizeStr.substring(i4 + 2, sizeStr.length);
        return { width: width + 'px', height: height + 'px' };
    }
    return { width: '50px', height: '50px' };
}

const mapDispatchToProps = {
    showImageDialog: (url) => showImageDialog(url),
}

export default connect(null, mapDispatchToProps)(QuestionContentPanel);