export default function scollToBottom (ref) {
  ref.current.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};
