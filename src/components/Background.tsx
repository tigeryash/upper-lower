const Background = ({ src }: { src: string }) => {
  return (
    <div
      style={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundImage: `url(${src})`,
        backgroundSize: "cover",
        backgroundPosition: "50%",
        filter: "brightness(50%)",
        zIndex: -1,
      }}
    ></div>
  );
};

export default Background;
