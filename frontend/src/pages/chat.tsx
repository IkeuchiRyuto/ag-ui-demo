"use client";
import React, { useState } from "react";
import "@copilotkit/react-ui/styles.css";
import { CopilotKit, useCopilotAction } from "@copilotkit/react-core";
import {
  AssistantMessageProps,
  CopilotChat,
  CopilotSidebar,
  Markdown,
  useChatContext,
  useCopilotChatSuggestions,
  UserMessageProps,
} from "@copilotkit/react-ui";

const AgenticChat: React.FC = () => {
  return (
    <CopilotKit
      runtimeUrl={"/api/copilotkit"}
      showDevConsole={true}
      agent="sample_agent"
    >
      <CopilotSidebar
        defaultOpen={false}
        instructions={
          "You are assisting the user as best as you can. Answer in the best way possible given the data you have."
        }
        labels={{
          title: "Sidebar Assistant",
          initial: "How can I help you today?",
        }}
      >
        <Chat />
      </CopilotSidebar>
    </CopilotKit>
  );
};

const Chat = () => {
  const [background, setBackground] = useState<string>("#fefefe");

  // useCopilotAction({
  //   name: "change_background",
  //   description:
  //     "Change the background color of the chat. Can be anything that the CSS background attribute accepts. Regular colors, linear of radial gradients etc.",
  //   parameters: [
  //     {
  //       name: "background",
  //       type: "string",
  //       description: "The background. Prefer gradients.",
  //     },
  //   ],
  //   handler: ({ background }) => {
  //     setBackground(background);
  //   },
  // });

  // useCopilotChatSuggestions({
  //   instructions:
  //     "You are a helpful assistant. You can change the background of the chat by calling the 'change_background' action with a valid CSS background value.",
  // });

  return (
    <div
      className="flex justify-center items-center h-full w-full"
      style={{ background }}
    >
      <div className="w-8/10 h-8/10 rounded-lg">
        <CopilotChat
          UserMessage={CustomUserMessage}
          AssistantMessage={CustomAssistantMessage}
          className="h-full w-full rounded-lg py-6"
          labels={{
            title: "Your Assistant",
            initial: "Hi! 👋 How can I assist you today?",
            stopGenerating: "Stop",
            regenerateResponse: "Regenerate",
          }}
        />
      </div>
    </div>
  );
};

const CustomUserMessage = (props: UserMessageProps) => {
  const wrapperStyles = "flex items-center gap-2 justify-end mb-4";
  const messageStyles =
    "bg-blue-500 text-white py-2 px-4 rounded-xl break-words flex-shrink-0 max-w-[80%]";
  const avatarStyles =
    "bg-blue-500 shadow-sm min-h-10 min-w-10 rounded-full text-white flex items-center justify-center";

  return (
    <div className={wrapperStyles}>
      <div className={messageStyles}>{props.message}</div>
      <div className={avatarStyles}>TS</div>
    </div>
  );
};

const CustomAssistantMessage = (props: AssistantMessageProps) => {
  const { icons } = useChatContext();
  const { message, isLoading, subComponent } = props;

  const avatarStyles =
    "bg-zinc-400 border-zinc-500 shadow-lg min-h-10 min-w-10 rounded-full text-white flex items-center justify-center";
  const messageStyles = "px-4 rounded-xl pt-2";

  const avatar = (
    <div className={avatarStyles}>
      TS
    </div>
  );

  return (
    <div className="py-2">
      <div className="flex items-start">
        {!subComponent && avatar}
        <div className={messageStyles}>
          {message && <Markdown content={message || ""} />}
          {isLoading && icons.spinnerIcon}
        </div>
      </div>
      <div className="my-2">{subComponent}</div>
    </div>
  );
};



export default AgenticChat;


