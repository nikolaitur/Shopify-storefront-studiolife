/* eslint-disable import/no-anonymous-default-export */
// studio/deskStructure.js

import S from "@sanity/desk-tool/structure-builder";
import { ImBriefcase, ImHome, ImQuestion, ImUserPlus, ImUsers } from "react-icons/im";

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
      .title("Private & Corporate Events")
      .icon(ImUserPlus)
      .child(
        S.editor()
          .id("privateEvents")
          .schemaType("privateEvents")
          .documentId("privateEvents")
          .title("Private & Corporate Events")
      ),
      S.listItem()
      .title("Partner with us")
      .icon(ImBriefcase)
      .child(
        S.editor()
          .id("partner")
          .schemaType("partner")
          .documentId("partner")
          .title("Partner with us")
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
          !["homepage","about", "help", "category", "privateEvents", "partner"].includes(listItem.getId())
      ),
    ]);
