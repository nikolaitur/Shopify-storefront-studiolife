/* eslint-disable import/no-anonymous-default-export */
// studio/deskStructure.js

import S from "@sanity/desk-tool/structure-builder";
import { ImHome, ImQuestion, ImUsers } from "react-icons/im";

export default () =>
  S.list()
    .title("Menu")
    .items([
      S.listItem()
      .title("Home")
      .icon(ImHome)
      .child(
        S.editor()
          .id("home")
          .schemaType("homepage")
          .documentId("home")
          .title("Home")
      ),
      S.listItem()
      .title("About")
      .icon(ImUsers)
      .child(
        S.editor()
          .id("about")
          .schemaType("about")
          .documentId("about")
          .title("About")
      ),
      S.listItem()
        .title("Help & Contact")
        .icon(ImQuestion)
        .child(
          S.editor()
            .id("help")
            .schemaType("help")
            .documentId("help")
            .title("Help & Contact")
        ),
        S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !["homepage","about", "help", "category"].includes(listItem.getId())
      ),
    ]);
