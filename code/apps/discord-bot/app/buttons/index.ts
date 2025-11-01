import { ButtonBuilder, type ButtonComponentData, type ButtonInteraction, ButtonStyle } from 'discord.js';
import type Client from '@/client';

export interface IButton {
  getId(): string;

  getLabel(): string;

  getStyle(): ButtonStyle;

  getEmoji(): string | undefined;

  getUrl(): string | undefined;

  getDisabled(): boolean;

  build(): ButtonBuilder;

  run(interaction: ButtonInteraction, client: Client): Promise<void>;
}

export abstract class ButtonAbstract implements IButton {
  protected id: string;
  protected label: string;
  protected style: ButtonStyle;
  protected emoji: string | undefined;
  protected url: string | undefined;
  protected disabled: boolean;

  constructor(
    id: string,
    label: string,
    style: ButtonStyle = ButtonStyle.Primary,
    disabled: boolean = false,
    emoji: string | undefined = undefined,
    url: string | undefined = undefined,
  ) {
    this.id = id;
    this.label = label;
    this.style = style;
    this.emoji = emoji;
    this.url = url;
    this.disabled = disabled;
  }

  getId(): string {
    return this.id;
  }

  getLabel(): string {
    return this.label;
  }

  getStyle(): ButtonStyle {
    return this.style;
  }

  getEmoji(): string | undefined {
    return this.emoji;
  }

  getUrl(): string | undefined {
    return this.url;
  }

  getDisabled(): boolean {
    return this.disabled;
  }

  build(): ButtonBuilder {
    const buttonData: Partial<ButtonComponentData> = {
      label: this.label,
      style: this.style,
      disabled: this.disabled,
    };

    if (this.url) {
      (buttonData as Partial<ButtonComponentData & { url: string }>).url = this.url;
    } else {
      (buttonData as Partial<ButtonComponentData & { customId: string }>).customId = this.id;
    }

    if (this.emoji) {
      buttonData.emoji = this.emoji;
    }

    return new ButtonBuilder(buttonData);
  }

  abstract run(interaction: ButtonInteraction, client: Client): Promise<void>;
}
