<template>
  <div>
    <div class="LifeGame">
      <div class="LifeGameView">
        <div
          class="LifeGameRow"
          v-for="(row, rowIndex) in cells"
          :key="rowIndex"
        >
          <life-cell
            :state="cell"
            @mousedown.native.prevent="paintStart(rowIndex, columnIndex)"
            @mouseenter.native="paint === null ? null : paintCell(rowIndex, columnIndex, $event)"
            v-for="(cell, columnIndex) in row"
            :key="`${rowIndex}x${columnIndex}`"
          />
        </div>
      </div>
    </div>
    <p>{{ frame }}</p>
    <input v-model="newSize" type="number" @keyup.enter="setNewSize" />
    <button @click.prevent="setNewSize">
      {{
        size === newSize
        ? `reset`
        : `set new size ${newSize}`
      }}</button>
    <hr />
    <button @click.prevent="goNext">Next</button>
    <hr />
    <input v-model="interval" type="number" step="10" @keyup.enter="auto = !auto" /> ms
    <button @click.prevent="auto = !auto">
      {{ auto ? 'stop' : 'start' }}
    </button>
  </div>
</template>
<script>
import LifeCell from '~/components/LifeCell.vue';

const N = [-1, 0, 1];
const MINIMUM_INTERVAL_MS = 150;
export default {
  components: {
    LifeCell,
  },
  data() {
    return {
      auto: false,
      interval: 600,
      timerId: null,
      size: 3,
      newSize: 10,
      cells: [[0,0,0], [0,0,0], [0,0,0]],
      frame: 0,
      paint: null,
      painted: new Set(),
    };
  },
  watch: {
    size(length) {
      this.auto = false;
    },
    auto(value) {
      value ? this.startAuto() : this.stopAuto();
    }
  },
  methods: {
    paintStart(rowIndex, columnIndex) {
      this.updateCellState(rowIndex, columnIndex, Math.abs(this.cells[rowIndex][columnIndex] - 1));
      this.paint = this.cells[rowIndex][columnIndex];
      this.painted.add(`${rowIndex}${columnIndex}`);
    },
    updateCellState(rowIndex, columnIndex, state) {
      const newRow = this.cells[rowIndex].map((current, index) => (
        index === columnIndex ? state : current
      ));
      this.cells.splice(rowIndex, 1, newRow);
    },
    paintEnd() {
      this.painted.clear();
      this.paint = null;
    },
    paintCell(rowIndex, columnIndex, event) {
      if (
        this.painted.has(`${rowIndex}${columnIndex}`)
        || (this.cells[rowIndex][columnIndex] > 0 && this.paint > 0)
        || (this.cells[rowIndex][columnIndex] === 0 && this.paint === 0)
      ) {
        return;
      }
      if (event.buttons === 0) {
        this.paintEnd();
        return;
      }
      this.updateCellState(rowIndex, columnIndex, this.paint);
      this.painted.add(`${rowIndex}${columnIndex}`);
    },
    startAuto() {
      this._loop();
    },
    stopAuto() {
      if (this.timerId !== null) {
        clearTimeout(this.timerId);
        this.timerId = null;
      }
    },
    _loop() {
      this.goNext();
      this.timerId = setTimeout(this._loop, Math.min(this.interval, MINIMUM_INTERVAL_MS));
    },
    setNewSize() {
      this.size = this.newSize;
      this.auto = false;
      this.frame = 0;
      this.cells = Array.from({ length: this.size }).map(_ => Array.from({ length: this.size }).fill(0));
    },
    goNext() {
      this.cells = this.cells.map((_row, rowIndex) => (
        _row.map((state, columnIndex) => this._lifecycle(rowIndex, columnIndex, state))
      ));
      this.frame += 1;
    },
    _lifecycle(rowIndex, columnIndex, state) {
      const points = N.reduce((sum, relativeRowIndex) => (
        sum + N.reduce((rowSum, relativeColumnIndex) => (
          rowSum + (
            this.cells[rowIndex + relativeRowIndex]
            ? (this.cells[rowIndex + relativeRowIndex][columnIndex + relativeColumnIndex] > 0 ? 1 : 0)
            : 0
          )
        ), 0)
      ), 0);
      return this.generateNewState(points, state);
    },
    generateNewState(points, state) {
      const pointsAround = points - Math.min(state, 1);
      return state === 0
        ? (pointsAround === 3 ? 1 : 0)
        : (pointsAround === 2 || pointsAround === 3 ? state + 1 : 0);
    },
  },
};
</script>
<style lang="scss" scoped>
.LifeGame {
  display: flex;
  justify-content: center;
  align-items: center;

  &View {
    display: flex;
    flex-direction: column;
  }
  &Row {
    display: flex;
  }
}
</style>
