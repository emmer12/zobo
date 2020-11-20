<template>
  <div class="coundown">
    <div class="c-header title primary--text">
      <h1>Celeb Countdown</h1>
    </div>

    <countdown class="count-down" :time="date | toCountdown">
      <template slot-scope="props">
        <div>{{ props.days }}</div>
        <div>{{ props.hours }}</div>
        <div>{{ props.minutes }}</div>
        <div>{{ props.seconds }}</div>
      </template>
    </countdown>
  </div>
</template>

<script>
export default {
  props: ["date"]
};
</script>

<style lang="scss" scoped>
.coundown {
    width:100%;
  .c-header {
    text-align: center;
    text-transform: uppercase;
    margin-top: 15px;
    h1 {
      font-size: 16px;
      letter-spacing: 10px;
    }
  }
  .count-down {
    display: flex;
    justify-content: center;
    margin:10px 20px;
    div {
      //  padding:10px;
      color: #e50913;
      border-radius: 50%;
      height: 100px;
      width: 100px;
      font-size: 2.5rem;
      border: 1px solid #ccc;
      text-align: center;
      line-height: 100px;
      margin: 5px;
    }
  }
}



@media (max-width:600px){
   .coundown {
  .c-header {
    h1 {
      font-size: 14px;
      letter-spacing: 8px;
    }
  }
  .count-down {
    margin:10px 15px;
    div {
      height: 50px;
      width: 50px;
      font-size: 1.5rem;
      line-height: 50px;
    }
  }
}
 
}
</style>