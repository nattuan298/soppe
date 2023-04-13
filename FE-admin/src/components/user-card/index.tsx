import "./styles.css";

interface UserCardProps {
  name: string;
  avatar?: string;
}

export function UserCard({ name, avatar }: UserCardProps) {
  function renderAvatar() {
    if (avatar) return <img className="avatar rounded-full mr-5" src={avatar} alt={name} />;
    const firstLetter = name.charAt(0).toUpperCase();
    return (
      <div className="user-letter flex justify-center items-center rounded-full text-orange-light mr-5">
        <span>{firstLetter}</span>
      </div>
    );
  }

  return (
    <div className="user-card flex items-center mr-7.5">
      {renderAvatar()}
      <div className="username">
        <div className="truncate-2-line">{name}</div>
      </div>
    </div>
  );
}
