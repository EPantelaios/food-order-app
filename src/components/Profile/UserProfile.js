import ProfileForm from './ProfileForm';
import classes from './UserProfile.module.css';

const UserProfile = () => {
  return (
    <section className={classes.profile}>
      <div>
        <h1>Your User Profile</h1>
        <ProfileForm />
      </div>
    </section>
  );
};

export default UserProfile;
