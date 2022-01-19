<template>
  <div class="card__container">
    <Skeleton :is-loaded="isLoaded" h="132px">
      <div class="card__image" :style="{ background: bgColor }">
        <img :src="require(`@/assets/${img}`)" />
      </div>
    </Skeleton>

    <div class="card__cnotent">
      <div class="card__content__title">
        <SkeletonWrapper width="40%" :isLoaded="isLoaded">
          <div class="content__tag">
            {{ tag }}
          </div>
        </SkeletonWrapper>

        <SkeletonWrapper width="40%" :isLoaded="isLoaded">
          <div class="content__date">
            {{ date }}
          </div>
        </SkeletonWrapper>
      </div>

      <div class="content__body">
        <SkeletonWrapper :isLoaded="isLoaded" class="body__title">
          <div class="body__title">
            {{ title }}
          </div>
        </SkeletonWrapper>

        <div class="body__description">
          {{ desc }}
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import SkeletonWrapper from "@/components/SkeletonWrapper.vue";
import Skeleton from "@/components/Skeleton.vue";

export default defineComponent({
  props: {
    bgColor: {
      type: String,
    },
    img: {
      type: String,
    },
    tag: {
      type: String,
    },
    date: {
      type: String,
    },
    title: {
      type: String,
    },
    desc: {
      type: String,
    },
    isLoaded: {
      type: Boolean,
    },
  },
  components: {
    Skeleton,
    SkeletonWrapper,
  },
  setup() {
    //
  },
});
</script>

<style lang="scss">
img {
  max-width: 100%;
  height: 100px;
  object-fit: cover;
}
.card__container {
  width: 340px;
  height: 400px;
  // height: auto;
  border: thin solid rgba(0, 0, 0, 50%);
}
%flex-row-center-all {
  display: flex;
  justify-content: center;
  align-items: center;
}
.card__image {
  @extend %flex-row-center-all;
  padding: 1rem;
}

.card__cnotent {
  padding: 1rem;
}
.card__content__title {
  @extend %flex-row-center-all;
  justify-content: space-between;
  padding: 1rem 0;
}
.body__title {
  font-weight: bold;
  margin: 1rem 0;
}
.body__description {
  line-height: 1.5;
}
</style>
