import React, {lazy, Suspense} from 'react';

const Profile = lazy(() => import('profile/Profile').catch(()=>{
  return {
    default: () => <div>Не удалось загрузить компонент Profile</div>
  }
}));

const Places = lazy(() => import('places/Places').catch(()=>{
  return {
    default: () => <div>Не удалось загрузить компонент Places</div>
  }
}));

function Main() {

  return (
    <main className="content">
      <Suspense>
        <Profile />
      </Suspense>
      <Suspense>
        <Places />
      </Suspense>
    </main>
  );
}

export default Main;