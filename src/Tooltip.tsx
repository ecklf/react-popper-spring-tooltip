import React, {
  useState,
  useEffect,
  useRef,
  ReactNode,
  ReactElement
} from "react";
import { useSpring, animated, config } from "react-spring";
import { Manager, Reference, Popper, RefHandler } from "react-popper";

interface TooltipProps {
  init?: boolean;
  springConfig?: { from: { [key: string]: any }; to: { [key: string]: any } };
  closeOnClickOutside?: boolean;
  content: string | ReactElement;
  children: (props: RenderProps) => ReactNode;
  trigger: "click" | "hover" | "context";
  placement:
    | "auto"
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "top-start"
    | "bottom-start"
    | "left-start"
    | "right-start"
    | "top-end"
    | "bottom-end"
    | "left-end"
    | "right-end";
}

interface TriggerEvents {
  click: { onClick: () => void };
  hover: { onMouseEnter: () => void; onMouseLeave: () => void };
  context: {
    onContextMenu: (e: MouseEvent) => void;
  };
}

interface RenderProps {
  ref: RefHandler;
  isOpen: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({
  init = false,
  springConfig = {
    from: { opacity: 0, config: config.stiff },
    to: { opacity: 1, config: config.stiff }
  },
  closeOnClickOutside = true,
  content,
  children,
  trigger,
  placement,
  ...props
}) => {
  const childRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(init);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent): void => {
      if (e.key === "Esc" || e.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    if (!closeOnClickOutside) return;
    const handleClickOutside = (e: MouseEvent): void => {
      if (
        childRef &&
        childRef.current &&
        !childRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const triggerEvents: TriggerEvents = {
    click: {
      onClick: () => setIsOpen(prev => !prev)
    },
    hover: {
      onMouseEnter: () => setIsOpen(true),
      onMouseLeave: () => setIsOpen(false)
    },
    context: {
      onContextMenu: e => {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
    }
  };

  const springProps = useSpring(isOpen ? springConfig.to : springConfig.from);

  return (
    <Manager>
      <Reference>
        {({ ref }) => (
          <div ref={childRef}>
            {children({ ref, isOpen, ...triggerEvents[trigger] })}
          </div>
        )}
      </Reference>
      <Popper placement={placement}>
        {({ ref, style, placement }) => (
          <animated.div
            {...props}
            ref={ref}
            style={Object.assign(style, springProps)}
            data-placement={placement}
          >
            {content}
          </animated.div>
        )}
      </Popper>
    </Manager>
  );
};

export default Tooltip;
