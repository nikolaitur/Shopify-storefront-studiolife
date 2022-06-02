/* eslint-disable import/no-anonymous-default-export */
// studio/deskStructure.js

import S from "@sanity/desk-tool/structure-builder";
import { ImBook, ImHome, ImQuestion } from "react-icons/im";

export default () =>
  S.list()
    .title("Menu")
    .items([
      S.listItem()
        .title("Help")
        .icon(ImQuestion)
        .child(
          S.editor()
            .id("help")
            .schemaType("help")
            .documentId("help")
            .title("Help")
        ),
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !["homepage", "about", "help"].includes(listItem.getId())
      ),
    ]);
