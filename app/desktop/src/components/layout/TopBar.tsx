import logo from '../../assets/gm-logo.png';
import avatar from '../../assets/user-avatar.png';
export function TopBar() {
  return (
    <header className="topbar">
      <img src={logo} alt="GM Studio" className="logo" />
      <img src={avatar} alt="Perfil" className="avatar" />
    </header>
  );
}
