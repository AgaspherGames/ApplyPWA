import { Card } from "@agaspher/apply.ui-kit";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonModal,
} from "@ionic/react";
import { arrowBack, chevronBack } from "ionicons/icons";
import React, { useRef, useState } from "react";
interface InputModalProps {
  isOpen: boolean;
  words: string[];
  onSelect: (word: string) => void;
  close: () => void;
}

const InputModal: React.FC<InputModalProps> = ({
  isOpen,
  close,
  onSelect,
  words,
}) => {
  const input = useRef<HTMLIonInputElement>(null);

  const [word, setWord] = useState("");
  const [filteredWords, setFilteredWords] = useState(words);

  function filterWords(word: string) {
    setFilteredWords(
      words.filter((x) => x.toLowerCase().includes(word.toLowerCase()))
    );
  }

  function select(word: string) {
    onSelect(word);
    setWord("");
    close();
  }

  return (
    <IonModal
      onDidPresent={() => {
        input.current?.setFocus();
      }}
      isOpen={isOpen}
      onWillDismiss={close}
    >
      <Card className="px-0 rounded-b-3xl">
        <div className="flex pr-4">
          <IonButton onClick={close} size="small" fill="clear">
            <IonIcon icon={chevronBack} />
          </IonButton>
          <IonInput
            value={word}
            onIonChange={(e) => {
              const newValue = e.target.value as string;
              setWord(newValue);
              filterWords(newValue);
            }}
            onIonInput={(e) => {
              const newValue = e.target.value as string;
              setWord(newValue);
              filterWords(newValue);
            }}
            ref={input}
            id="open-input-modal"
            placeholder="Frontend"
            className="border-b"
          />
        </div>
        {word && (
          <>
            <h3 className="pl-6 my-4 text-2xl font-bold text-stone-500">
              Результаты
            </h3>
            <IonButton
              onClick={() => {
                select(word);
              }}
              fill="clear"
              className=" bg-stone-900"
              color={"dark"}
              expand="full"
            >
              <IonLabel className="w-full text-left pl-4 normal-case">
                {word}
              </IonLabel>
            </IonButton>
            {filteredWords.map((el, ind) => (
              <IonButton
                onClick={() => {
                  select(el);
                }}
                key={ind}
                fill="clear"
                color={"dark"}
                expand="full"
              >
                <IonLabel className="w-full text-left pl-4 normal-case">
                  {el}
                </IonLabel>
              </IonButton>
            ))}
          </>
        )}
      </Card>
    </IonModal>
  );
};

export default InputModal;
