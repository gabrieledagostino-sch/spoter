<script>


</script>

<div class="profile">
    <p class="Username" >
        <b>Prova</b>
    </p>
    <div class="profilePic">
        <img src="https://picsum.photos/200" alt="">
    </div>
    <ul class="userInfo">
        <li>
            <span>Canzoni scoperte</span>
            <span>:</span>
            <span>n</span>
        </li>
        <li>
            <span>Canzoni interessanti</span>
            <span>:</span>
            <span>n</span>
        </li>
        <li>
            <span>Canzoni importate su spotify</span>
            <span>:</span>
            <span>n</span>
        </li>
        <li>
            <span>Playlist create</span>
            <span>:</span>
            <span>n</span>
        </li>
    </ul>
    <div class="menu">
        <i class="fa-solid fa-gear"></i>
    </div>
</div>

<style>
    .profile{
        width: 100%;
        height: 100%;
        border: 1px solid var(--complementaryFG);
        border-radius: 20px;
        box-sizing: border-box;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 15% 30% 45% 10%;
    }

    .profilePic {
        margin: auto auto;
        box-sizing: border-box;
        border: 1px solid var(--complementaryFG);
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        width: 10vw;
        height: 10vw;
        border-radius: 50%;
    }
    .profilePic img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .Username {
        margin: auto auto;
        text-align: center;
        color: var(--complementaryFG);
        font-size: var(--mediumText);
    }
    .userInfo {
        all:unset;
        margin: 2vh 1vw;
        padding: 3vh 2vw;
        text-align: center;
        color: var(--complementaryFG);
        background-color: rgba(0,0,0,0.5);
        border-radius: 25px;
        list-style: circle;
    }
    .userInfo li {
        margin: 0 0 10px 0 ;
        display: grid;
        grid-template-columns: 75% 1% 24%;
        justify-content: space-between;
    }
    .userInfo li span:first-child {
        text-align: left;
    }
    .userInfo li span:last-child{
        text-align: right;
    }
    .menu {
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
