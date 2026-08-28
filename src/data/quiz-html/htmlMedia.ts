import type { QuizQuestion } from "../../types/quiz";

export const htmlMediaQuestions: QuizQuestion[] = [
  {
    id: "html-media-1",
    question: "What is the purpose of the controls attribute on a <video> or <audio> element?",
    type: "single",
    options: [
      "It tells the browser to display its built-in play/pause, volume, and seek UI for the media",
      "It restricts the media so it can only be played once per page load",
      "It forces the media to start playing automatically as soon as the page loads",
      "It hides the media element visually while still allowing audio playback",
    ],
    correctIndexes: [0],
    explanation:
      "The controls attribute tells the browser to render its native playback interface, such as play/pause, a seek bar, and volume, without any custom JavaScript needed.",
  },
  {
    id: "html-media-2",
    question: "Which statement about the autoplay attribute on <video> is accurate in modern browsers?",
    type: "single",
    options: [
      "Autoplaying video with sound is commonly blocked unless the video is also muted, due to browser policies against unwanted audio",
      "Autoplay always works regardless of whether the video has sound",
      "Autoplay is only supported on <audio>, never on <video>",
      "Autoplay requires the user to have already interacted with a <button> on the same page before the tag is even parsed",
    ],
    correctIndexes: [0],
    explanation:
      "Most modern browsers block autoplaying media with sound to prevent unwanted noise, but generally still allow autoplay when the element is also marked muted.",
  },
  {
    id: "html-media-3",
    question: "What does the loop attribute do when added to a <video> or <audio> element?",
    type: "single",
    options: [
      "It makes the media automatically restart from the beginning once playback reaches the end",
      "It repeats the initial buffering step multiple times before playback can start",
      "It causes the browser to download the media file multiple times",
      "It disables the seek bar in the native controls UI",
    ],
    correctIndexes: [0],
    explanation:
      "loop makes playback restart from the beginning automatically each time it reaches the end, continuing indefinitely instead of stopping.",
  },
  {
    id: "html-media-4",
    question: "What does the muted attribute do on a <video> element?",
    type: "single",
    options: [
      "It starts the video with its audio track silenced by default",
      "It permanently removes the audio track from the video file itself",
      "It hides the video's visual controls",
      "It prevents the video from being played at all until unmuted",
    ],
    correctIndexes: [0],
    explanation:
      "muted sets the initial playback volume to silent without altering the underlying file; the user (or script) can still unmute it afterward.",
  },
  {
    id: "html-media-5",
    question: "Why would a <video> element contain multiple <source> child elements pointing to different files, such as an .mp4 and a .webm version?",
    type: "single",
    options: [
      "So the browser can pick the first format it supports as a fallback, since not every browser supports every video codec/container",
      "So all of the listed formats play simultaneously, layered on top of each other",
      "So the file with the smallest size is always downloaded, regardless of format support",
      "Multiple <source> elements are purely decorative and have no effect on playback",
    ],
    correctIndexes: [0],
    explanation:
      "Browsers vary in which video codecs and containers they support, so listing multiple <source> elements lets the browser choose the first one it can actually play.",
  },
  {
    id: "html-media-6",
    question: "In <video><source src=\"movie.mp4\" type=\"video/mp4\"><source src=\"movie.webm\" type=\"video/webm\">Your browser does not support video.</video>, what is the role of the plain text \"Your browser does not support video.\"?",
    type: "single",
    options: [
      "It is fallback content shown only if the browser cannot play any of the provided <source> elements",
      "It is a caption displayed underneath the video at all times",
      "It is read aloud automatically by the browser before the video begins",
      "It replaces the video's title attribute in the browser tab",
    ],
    correctIndexes: [0],
    explanation:
      "Content placed inside <video> or <audio> after the <source> elements is fallback content, displayed only when the browser supports neither the element nor any listed source.",
  },
  {
    id: "html-media-7",
    question: "Why did native <video> and <audio> elements largely replace older plug-in-based approaches to embedding media, such as Adobe Flash?",
    type: "multi",
    options: [
      "Native elements do not require installing a separate browser plug-in to play media",
      "Plug-ins like Flash had significant security vulnerabilities and were eventually dropped from major browsers",
      "Native elements were the very first way to display any media at all in a browser",
      "Native elements can be controlled directly through standard JavaScript and CSS without plug-in-specific APIs",
    ],
    correctIndexes: [0, 1, 3],
    explanation:
      "Native media elements removed the need for a separate plug-in, avoided that plug-in ecosystem's security problems, and exposed a standard JavaScript/CSS-controllable API, all of which led major browsers to drop Flash support.",
  },
  {
    id: "html-media-8",
    question: "What was <embed> historically used for in older web pages?",
    type: "single",
    options: [
      "Embedding external plug-in-driven content, such as a Flash animation or a PDF viewer",
      "Displaying a bulleted list of related links",
      "Setting the character encoding of the document",
      "Declaring a page's primary navigation region",
    ],
    correctIndexes: [0],
    explanation:
      "<embed> was used to embed content that relied on an external plug-in to render, such as Flash movies or certain document viewers, before native browser support for such formats existed.",
  },
  {
    id: "html-media-9",
    question: "Why are <embed> and <object> now considered largely obsolete for most common media use cases?",
    type: "single",
    options: [
      "Modern browsers natively support formats like video, audio, and PDF rendering, so dedicated elements such as <video>, <audio>, and <iframe> are typically preferred instead",
      "They were removed entirely from the HTML specification and no longer parse in any browser",
      "They are only supported in mobile browsers, not desktop browsers",
      "They were replaced by a requirement to use only <canvas> for all embedded content",
    ],
    correctIndexes: [0],
    explanation:
      "As browsers gained native support for common media types, purpose-built elements like <video>, <audio>, and <iframe> became the preferred choice, leaving <embed>/<object> mostly for legacy or niche plug-in content.",
  },
  {
    id: "html-media-10",
    question: "What is the standard approach for embedding a YouTube video directly into a page you control?",
    type: "single",
    options: [
      "Use an <iframe> whose src points to YouTube's embed URL for that video",
      "Download the video file and reference it directly with a <video> element's src",
      "Use an <object> element pointing to the video's regular YouTube watch page URL",
      "YouTube videos cannot be embedded in another website for licensing reasons",
    ],
    correctIndexes: [0],
    explanation:
      "YouTube provides a dedicated embed URL meant to be loaded inside an <iframe>, which handles playback through YouTube's own player without requiring the video file itself.",
  },
  {
    id: "html-media-11",
    question: "Which of the following are true about using <audio controls src=\"song.mp3\"></audio> on a page?",
    type: "multi",
    options: [
      "It renders a native playback widget with play/pause and volume controls",
      "It requires no additional JavaScript for basic play/pause functionality to work",
      "It automatically transcribes the audio into visible captions",
      "The browser must support the audio file's format for playback to succeed",
    ],
    correctIndexes: [0, 1, 3],
    explanation:
      "The controls attribute alone provides working native playback with no extra JavaScript, but the browser still needs codec support for the given audio format, and no automatic transcription is performed.",
  },
  {
    id: "html-media-12",
    question: "Why might a developer prefer an <iframe> embed over uploading a video file directly with <video src=\"...\"> for a video hosted on a third-party platform like YouTube or Vimeo?",
    type: "single",
    options: [
      "The <iframe> offloads video hosting, streaming, adaptive quality, and bandwidth costs to the third-party platform instead of the site owner's own server",
      "The <iframe> produces a sharper video image than <video> ever can",
      "The <iframe> element is required by HTML for any video longer than one minute",
      "The <video> element cannot play .mp4 files hosted on another domain",
    ],
    correctIndexes: [0],
    explanation:
      "Embedding via <iframe> lets the third-party platform handle hosting, streaming, and bandwidth, which is why it is common for videos hosted on platforms like YouTube rather than self-hosting the file.",
  },
];
