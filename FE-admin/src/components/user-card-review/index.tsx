import "./styles.css";

interface UserCardProps {
  name: string;
  avatar?: string;
  memberId?: string;
}

export function UserCard({ name, avatar, memberId }: UserCardProps) {
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
        <p className="text-orange-light text-lg">{memberId}</p>
        <div className="name">{name}</div>
      </div>
    </div>
  );
}
