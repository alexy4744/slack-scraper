/* A class to construct a fancy message easily with chainable methods */
// https://api.slack.com/docs/message-attachments
const { colors, emojis } = require("./Constants");

class RichMessage {
  constructor() {
    Object.assign(this, {
      fallback: null,
      color: null,
      pretext: null,
      authorName: null,
      authorLink: null,
      authorIcon: null,
      title: null,
      titleLink: null,
      text: null,
      fields: [],
      imageURL: null,
      thumbURL: null,
      footer: null,
      footerIcon: null,
      actions: []
    });
  }

  get message() {
    return {
      attachments: [
        {
          "fallback": this.fallback,
          "color": this.color,
          "pretext": this.pretext,
          "authorName": this.authorName,
          "authorLink": this.authorLink,
          "authorIcon": this.authorIcon,
          "title": this.title,
          "titleLink": this.titleLink,
          "text": this.text,
          "fields": this.fields,
          "image_url": this.imageURL,
          "thumb_url": this.thumbURL,
          "footer": this.footer,
          "footer_icon": this.footerIcon,
          "actions": this.actions
        }
      ]
    };
  }

  setFallback(text) {
    this.fallback = text;
    return this;
  }

  setColor(hex) {
    this.color = hex;
    return this;
  }

  setPretext(text) {
    this.pretext = text;
    return this;
  }

  setAuthorName(name) {
    this.authorName = name;
    return this;
  }

  setAuthorLink(link) {
    this.authorLink = link;
    return this;
  }

  setAuthorIcon(icon) {
    this.authorIcon = icon;
    return this;
  }

  setTitle(title) {
    this.title = title;
    return this;
  }

  setTitleLink(link) {
    this.titleLink = link;
    return this;
  }

  setText(text) {
    this.text = text;
    return this;
  }

  addField(title, value, short) {
    this.fields.push({
      title,
      value,
      short: short || false
    });

    return this;
  }

  setImage(url) {
    this.imageURL = url;
    return this;
  }

  setThumbnail(url) {
    this.thumbURL = url;
    return this;
  }

  setFooter(text) {
    this.footer = text;
    return this;
  }

  setFooterIcon(url) {
    this.footerIcon = url;
    return this;
  }

  addButton(text, url, style) {
    this.actions.push({
      type: "button",
      text,
      url,
      style: style || null
    });

    return this;
  }

  buildError(error) {
    this.setTitle(`${emojis.fail}Sorry, an error has occurred!`);
    this.setText(`\`\`\`\n${error}\n\`\`\``);
    this.setColor(colors.fail);
    return this.message;
  }
}

module.exports = RichMessage;