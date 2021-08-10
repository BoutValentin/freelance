<script>
    export let svg;
    export let path;
  </script>
  
  <a href={path} rel="external nofollow" target="_blank">
    <div class="skillsRound">
      {@html svg}
    </div>
  </a>
  
  <style>
    .skillsRound {
      cursor: pointer;
      border: 2px solid var(--main-bg-color);
      height: 70px;
      width: 70px;
      padding: 10px;
      border-radius: 60px;
      background-color: var(--main-font-color);
      -webkit-box-shadow: 0px 0px 7px 2px var(--shadow-skills);
      box-shadow: 0px 0px 7px 2px var(--shadow-skills);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 15px auto;
    }
  
    a:active .skillsRound {
      -webkit-box-shadow: none;
      box-shadow: none;
    }
  </style>
  