import React, { useState, ReactNode, ReactElement } from "react";
import { useSpring, animated, config } from "react-spring";
import { Manager, Reference, Popper, RefHandler } from "react-popper";

interface TooltipProps {
  init?: boolean;
  springConfig?: { from: { [key: string]: any }; to: { [key: string]: any } };
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
  context: { onContextMenu: (e: MouseEvent) => void };
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
  content,
  children,
  trigger,
  placement,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(init);

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
          <React.Fragment>
            {children({ ref, isOpen, ...triggerEvents[trigger] })}
          </React.Fragment>
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
