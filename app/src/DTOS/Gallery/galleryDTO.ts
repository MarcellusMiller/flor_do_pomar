export default interface imageDTO {
    author: string;
    path?: string;
    description: {
        translations :[
            {lang: "pt", text: string},
            {lang: "en", text: string}
        ]
    }
}