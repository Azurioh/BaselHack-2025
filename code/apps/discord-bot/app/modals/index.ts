import {
  ActionRowBuilder,
  ModalBuilder,
  type ModalSubmitInteraction,
  TextInputBuilder,
  type TextInputStyle,
} from 'discord.js';
import type Client from '@/client';

export class ModalInput {
  private placeholder: string;
  private value: string;
  private required: boolean;
  private style: TextInputStyle;
  private label: string;
  private maxLength?: number;
  private minLength?: number;

  constructor(
    placeholder: string,
    value: string,
    required: boolean,
    style: TextInputStyle,
    label: string,
    maxLength?: number,
    minLength?: number,
  ) {
    this.maxLength = maxLength;
    this.minLength = minLength;
    this.placeholder = placeholder;
    this.value = value;
    this.required = required;
    this.style = style;
    this.label = label;
  }

  getMaxLength(): number | undefined {
    return this.maxLength;
  }

  getMinLength(): number | undefined {
    return this.minLength;
  }

  getPlaceholder(): string {
    return this.placeholder;
  }

  getValue(): string {
    return this.value;
  }

  isRequired(): boolean {
    return this.required;
  }

  getStyle(): TextInputStyle {
    return this.style;
  }

  getLabel(): string {
    return this.label;
  }
}

export interface IModal {
  getId(): string;

  getTitle(): string;

  getInputs(): ModalInput[];

  build(): ModalBuilder;

  run(interaction: ModalSubmitInteraction, client: Client): Promise<void>;
}

export abstract class ModalAbstract implements IModal {
  protected id: string;
  protected title: string;
  protected description: string;
  protected inputs: ModalInput[];

  constructor(id: string, title: string, description: string) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.inputs = [];
  }

  getId(): string {
    return this.id;
  }

  getTitle(): string {
    return this.title;
  }

  getDescription(): string {
    return this.description;
  }

  getInputs(): ModalInput[] {
    return this.inputs;
  }

  setId(id: string): void {
    this.id = id;
  }

  setTitle(title: string): void {
    this.title = title;
  }

  setDescription(description: string): void {
    this.description = description;
  }

  addInput(input: ModalInput): void {
    this.inputs.push(input);
  }

  build(): ModalBuilder {
    const modal = new ModalBuilder().setCustomId(this.id).setTitle(this.title);
    const inputs = this.inputs.map(
      (input) =>
        new TextInputBuilder({
          customId: input.getValue(),
          label: input.getLabel(),
          style: input.getStyle(),
          required: input.isRequired(),
          maxLength: input.getMaxLength() ?? 5000,
          minLength: input.getMinLength() ?? 1,
          placeholder: input.getPlaceholder(),
        }),
    );
    const _actionRows = inputs.map((input) => new ActionRowBuilder<TextInputBuilder>().addComponents(input));
    modal.addComponents(..._actionRows);
    return modal;
  }

  abstract run(interaction: ModalSubmitInteraction, client: Client): Promise<void>;
}
