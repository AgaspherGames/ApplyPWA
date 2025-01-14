import ScrollShadow from "@/subapps/practice/shared/ui/ScrollShadow";
import { Card } from "@agaspher/apply.ui-kit";
import { IonIcon, IonTextarea } from "@ionic/react";
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { twMerge } from "tailwind-merge";
interface MessageInputProps {
  text: string;
  disabled: boolean;
  setText: (text: string) => void;
  onSend: () => Promise<unknown>;
}
export type MessageInputHandles = {
  hoverInput: () => void;
};

const MessageInput = forwardRef<MessageInputHandles, MessageInputProps>(
  ({ onSend, setText, text, disabled }, ref) => {
    const inputRef = useRef<HTMLIonTextareaElement>(null);

    function hoverInput() {
      inputRef.current?.setFocus();
    }

    useImperativeHandle(ref, () => ({
      hoverInput,
    }));

    return (
      <Card
        className={twMerge(
          "bg-opacity-100 bg-stone-900 inset-x-0 rounded-none py-0 flex max-h-64 items-end gap-4"
        )}
      >
        <ScrollShadow className="max-h-64 w-full py-1">
          <IonTextarea
            disabled={disabled}
            ref={inputRef}
            onIonInput={(e) => setText(e.target.value as string)}
            value={text}
            className="h-fit"
            autoGrow
            rows={1}
            placeholder="Сообщение..."
          />
        </ScrollShadow>

        <button
          disabled={disabled}
          onClick={onSend}
          className="w-8 h-8 mb-2 flex items-center justify-center disabled:text-stone-600"
        >
          <IonIcon className=" w-5 h-5" src="/icons/BI/send-icon.svg" />
        </button>
      </Card>
    );
  }
);

export default MessageInput;
