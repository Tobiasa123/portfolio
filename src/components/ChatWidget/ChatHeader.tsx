// //src/components/ChatWidget/ChatHeader.tsx

// "use client";

// type ChatHeaderProps = {
//   collapsed: boolean;
//   setCollapsed: React.Dispatch<React.SetStateAction<boolean>>; 
// };

// export default function ChatHeader({ collapsed, setCollapsed }: ChatHeaderProps) {
//   return (
//     <button
//       onClick={() => setCollapsed(prev => !prev)}
//       className="flex items-center justify-between w-full px-3 border-b border-border text-left cursor-pointer"
//     >
//       <span>Chat with us</span>
//       <span>{collapsed ? "▲" : "▼"}</span>
//     </button>
//   );
// }
