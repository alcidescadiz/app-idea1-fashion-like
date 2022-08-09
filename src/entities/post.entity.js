import { v4 } from "uuid";

export function PostEsquema(  
    post, img, description) {
      return [
        {
          id: {
            value: v4(),
            type: "string",
            empty: false
          },
          post: {
              value: post,
              type: "string",
              empty: false
            },
          img: {
            value: img,
            type: "string",
            empty: false,
          },
          description: {
            value: description,
            type: "string",
            empty: false,
          },
          date: {
            value: new Date().toString().split(' ').splice(0,4).join(" "),
            type: "string"
          }
        }
      ];
    }