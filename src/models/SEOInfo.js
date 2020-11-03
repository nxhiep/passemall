export default class SEOInfo {
    constructor(props) {
        let { title, description, keyword, shareImage, titleSEO, descriptionSEO, bannerImage } = props ? props : {};
        this.title = title;
        this.description = description;
        this.titleSEO = titleSEO ? titleSEO : title;
        this.descriptionSEO = descriptionSEO ? descriptionSEO : description;
        this.keyword = keyword;
        this.image = shareImage ? shareImage : bannerImage;
    }
}