export default interface imageDTO {
    name: string;
    path?: string;
    tag: string
    orientation: "portrait" | "landscape";
}