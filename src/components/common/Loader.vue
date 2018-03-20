<template>
  <div align="center" class="cssload-fond" v-if="isLoading">
    <div class="cssload-container-general">
      <div class="cssload-internal">
        <div class="cssload-ballcolor cssload-ball_1"> </div>
      </div>
      <div class="cssload-internal">
        <div class="cssload-ballcolor cssload-ball_2"> </div>
      </div>
      <div class="cssload-internal">
        <div class="cssload-ballcolor cssload-ball_3"> </div>
      </div>
      <div class="cssload-internal">
        <div class="cssload-ballcolor cssload-ball_4"> </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'loader',

    props: {
      'isLoading': {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .cssload-fond {
    position: relative;
    margin: auto;
  }

  .cssload-container-general {
    animation: cssload-animball_two 1.15s infinite;
    -o-animation: cssload-animball_two 1.15s infinite;
    -ms-animation: cssload-animball_two 1.15s infinite;
    -webkit-animation: cssload-animball_two 1.15s infinite;
    -moz-animation: cssload-animball_two 1.15s infinite;
    width: 105px;
    height: 105px;
  }

  .cssload-internal {
    width: 105px;
    height: 105px;
    position: absolute;
  }

  .cssload-ballcolor {
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }

  .cssload-ball_1, .cssload-ball_2, .cssload-ball_3, .cssload-ball_4 {
    position: absolute;
    animation: cssload-animball_one 1.15s infinite ease;
    -o-animation: cssload-animball_one 1.15s infinite ease;
    -ms-animation: cssload-animball_one 1.15s infinite ease;
    -webkit-animation: cssload-animball_one 1.15s infinite ease;
    -moz-animation: cssload-animball_one 1.15s infinite ease;
  }

  .cssload-ball_1 {
    background-color: rgb(101, 223, 244);
    top: 0;
    left: 0;
  }

  .cssload-ball_2 {
    background-color: rgb(25, 123, 188);
    top: 0;
    left: 57px;
  }

  .cssload-ball_3 {
    background-color: rgb(43, 56, 144);
    top: 57px;
    left: 0;
  }

  .cssload-ball_4 {
    background-color: rgb(238, 27, 38);
    top: 57px;
    left: 57px;
  }

  @keyframes cssload-animball_one {
    0% {
      position: absolute;
    }
    50% {
      top: 29px;
      left: 29px;
      position: absolute;
      opacity: 0.5;
    }
    100% {
      position: absolute;
    }
  }

  @-o-keyframes cssload-animball_one {
    0% {
      position: absolute;
    }
    50% {
      top: 29px;
      left: 29px;
      position: absolute;
      opacity: 0.5;
    }
    100% {
      position: absolute;
    }
  }

  @-ms-keyframes cssload-animball_one {
    0% {
      position: absolute;
    }
    50% {
      top: 29px;
      left: 29px;
      position: absolute;
      opacity: 0.5;
    }
    100% {
      position: absolute;
    }
  }

  @-webkit-keyframes cssload-animball_one {
    0% {
      position: absolute;
    }
    50% {
      top: 29px;
      left: 29px;
      position: absolute;
      opacity: 0.5;
    }
    100% {
      position: absolute;
    }
  }

  @-moz-keyframes cssload-animball_one {
    0% {
      position: absolute;
    }
    50% {
      top: 29px;
      left: 29px;
      position: absolute;
      opacity: 0.5;
    }
    100% {
      position: absolute;
    }
  }

  @keyframes cssload-animball_two {
    0% {
      transform: rotate(0deg) scale(1);
    }
    50% {
      transform: rotate(360deg) scale(1.3);
    }
    100% {
      transform: rotate(720deg) scale(1);
    }
  }

  @-o-keyframes cssload-animball_two {
    0% {
      -o-transform: rotate(0deg) scale(1);
    }
    50% {
      -o-transform: rotate(360deg) scale(1.3);
    }
    100% {
      -o-transform: rotate(720deg) scale(1);
    }
  }

  @-ms-keyframes cssload-animball_two {
    0% {
      -ms-transform: rotate(0deg) scale(1);
    }
    50% {
      -ms-transform: rotate(360deg) scale(1.3);
    }
    100% {
      -ms-transform: rotate(720deg) scale(1);
    }
  }

  @-webkit-keyframes cssload-animball_two {
    0% {
      -webkit-transform: rotate(0deg) scale(1);
    }
    50% {
      -webkit-transform: rotate(360deg) scale(1.3);
    }
    100% {
      -webkit-transform: rotate(720deg) scale(1);
    }
  }

  @-moz-keyframes cssload-animball_two {
    0% {
      -moz-transform: rotate(0deg) scale(1);
    }
    50% {
      -moz-transform: rotate(360deg) scale(1.3);
    }
    100% {
      -moz-transform: rotate(720deg) scale(1);
    }
  }
</style>
